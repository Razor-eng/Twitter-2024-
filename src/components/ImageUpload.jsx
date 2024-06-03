/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Context } from "../context/Context";

const ImageUpload = ({ onChange, label, value, disabled, isProfile, currentUser, currentUserUid }) => {
    const [base64, setBase64] = useState(value);
    const { getFetchedUser } = useContext(Context);

    const handleChange = (file) => {
        onChange(file);
    };

    const uploadData = (file) => {
        if (isProfile) {
            const profileImageRef = ref(storage, `${currentUser?.id}/profileImage`);
            uploadBytes(profileImageRef, file).then(async () => {
                const downloadURL = await getDownloadURL(profileImageRef);

                await updateDoc(doc(db, "users", currentUserUid), {
                    profileImage: downloadURL,
                });
            }).then(() => {
                getFetchedUser(currentUser.id);
            });
        } else {
            const coverImageRef = ref(storage, `${currentUser?.id}/coverImage`);

            uploadBytes(coverImageRef, file).then(async () => {
                const downloadURL = await getDownloadURL(coverImageRef);
                await updateDoc(doc(db, "users", currentUserUid), {
                    coverImage: downloadURL,
                }).then(() => {
                    getFetchedUser(currentUser.id);
                });
            });
        }
    }

    const handleDrop = (files) => {
        const file = files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
            uploadData(file);
        };
        reader.readAsDataURL(file);
    }

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    });

    return (
        <div {...getRootProps({ className: 'w-full p-4 text-center border-2 border-dotted rounded-md dark:border-neutral-700 cursor-pointer' })}>
            <input {...getInputProps()} />
            {base64 ? (
                <div className="flex items-center justify-center">
                    <img
                        src={base64}
                        height="100"
                        width="100"
                        alt="Uploaded image"
                        className={`${isProfile ? 'rounded-full border p-1 w-32' : 'w-full h-32'}`}
                    />
                </div>
            ) : (
                <p>{label}</p>
            )}
        </div>
    );
}

export default ImageUpload;