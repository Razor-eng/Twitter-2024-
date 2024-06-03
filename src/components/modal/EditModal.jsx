import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Context } from "../../context/Context";
import Modal from "./Modal";
import Input from "../Input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const { edit, closeEditModal, getFetchedUser, currentUser, currentUserUid } = useContext(Context);

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio || '')
    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await updateDoc(doc(db, 'users', currentUserUid), {
                name: name,
                username: username,
                bio: bio
            }).then(() => {
                toast.success('Updated');
                closeEditModal();
            })
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
            getFetchedUser(currentUser.id);
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" isProfile={true} currentUser={currentUser} currentUserUid={currentUserUid} />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" isProfile={false} currentUser={currentUser} currentUserUid={currentUserUid} />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={edit}
            title="Edit your profile"
            actionLabel="Save"
            onClose={closeEditModal}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
}

export default EditModal;
