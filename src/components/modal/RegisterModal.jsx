import { toast } from "react-hot-toast";
import { useContext, useState } from "react";
import Input from "../Input";
import Modal from "./Modal";
import { Context } from "../../context/Context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const RegisterModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const { toggle, register, closeRegisterModal } = useContext(Context);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name
                    }).then(async () => {
                        await addDoc(collection(db, 'users'), {
                            id: user.uid,
                            name: user.displayName,
                            username: username,
                            email: user.email,
                            createdAt: Date.now()
                        })
                    })
                }).then(() => {
                    setIsLoading(false);
                    toast.success('Account created.');
                })
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                disabled={isLoading}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                disabled={isLoading}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )

    const footerContent = (
        <div className="text-center mt-4">
            <p>Already have an account?{" "}
                <span
                    onClick={toggle}
                    className="
          text-neutral-500 
            cursor-pointer 
            hover:underline
          "
                >Sign in</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={register}
            title="Create an account"
            actionLabel="Register"
            onClose={closeRegisterModal}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;
