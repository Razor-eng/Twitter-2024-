import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

import Input from "../Input";
import { Context } from "../../context/Context";
import Modal from "./Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const LoginModal = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toggle, login, closeLoginModal, getUser } = useContext(Context);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                closeLoginModal();
            })
            toast.success('Logged in');
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            getUser();
            setIsLoading(false);
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-center mt-4">
            <p>New to Twitter?{" "}
                <span
                    onClick={toggle}
                    className="
          text-neutral-500
            cursor-pointer 
            hover:underline
          "
                >Create an account</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={login}
            title="Login"
            actionLabel="Sign in"
            onClose={closeLoginModal}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;
