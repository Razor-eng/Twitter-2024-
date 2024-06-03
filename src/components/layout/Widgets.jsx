import { IoIosSearch } from "react-icons/io";
import News from "./News";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import FollowBar from "./FollowBar";
import { Context } from "../../context/Context";

export default function Widgets() {
    let [articles, setArticles] = useState([]);
    const [articleNum, setArticleNum] = useState(3);
    const [randomUserNum, setRandomUserNum] = useState(3);
    const { currentUser, users } = useContext(Context);

    useEffect(() => {
        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json").then((res) => {
            setArticles(res.data.articles);
        })
    }, [])

    const check = (user) => {
        if (currentUser) {
            if (user.data.id === currentUser.id) {
                return false;
            }
            else if (currentUser?.followingIds?.includes(user.data.id)) {
                return false;
            }
            else {
                return true;
            }
        } else {
            return true
        }
    }

    return (
        <div className="hidden lg:inline w-full ml-8 space-y-5">
            {/* Search */}
            <div className="flex items-center p-3 rounded-full mt-2 relative">
                <IoIosSearch className="h-5 w-5 z-10 text-gray-500" />
                <input
                    className="absolute inset-0 rounded-full pl-11 outline-none focus:outline-blue-500 focus:dark:outline-blue-500 dark:text-white transition-all ease-in duration-100 border-zinc-500 text-gray-700 focus:shadow-lg focus:bg-white dark:focus:bg-zinc-800 bg-gray-100 dark:bg-zinc-950"
                    type="text"
                    placeholder="Search Twitter"
                />
            </div>

            {/* News */}
            <div className="space-y-3 border dark:border-neutral-800 rounded-xl pt-2 mt-2">
                <h4 className="font-bold text-xl px-4 pb-3 border-b dark:border-neutral-800">Whats happening</h4>
                <AnimatePresence>
                    {articles.slice(0, articleNum).map((article) => (
                        <motion.div
                            key={article.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <News key={article.title} article={article} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="flex justify-between">
                    {articleNum > 3 ?
                        <>
                            <button
                                onClick={() => setArticleNum(articleNum - 3)}
                                className="text-blue-300 pl-2 pb-3 hover:text-blue-400"
                            >
                                Show less
                            </button>
                            <button
                                onClick={() => setArticleNum(articleNum + 3)}
                                className="text-blue-300 pr-2 pb-3 hover:text-blue-400"
                            >
                                Show more
                            </button>
                        </>
                        :
                        <button
                            onClick={() => setArticleNum(articleNum + 3)}
                            className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
                        >
                            Show more
                        </button>
                    }
                </div>
            </div>

            {/* Users */}
            <div className="sticky top-16 pt-2 rounded-xl space-y-3 border dark:border-neutral-800">
                <h4 className="font-bold text-xl px-4 pb-3 border-b dark:border-neutral-800">Who to follow</h4>
                <AnimatePresence>
                    {users?.filter(check).slice(0, randomUserNum).map((user, id) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <FollowBar user={user} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {users?.length - currentUser?.followingIds?.length === 1 &&
                    <div className="min-h-20 flex items-center justify-center">
                        <p className="text-zinc-500 text-lg">No New Users Found</p>
                    </div>
                }
                {
                    currentUser ?
                        (
                            (users?.length - currentUser?.followingIds?.length > 3)
                            &&
                            <div className="flex justify-between">
                                {randomUserNum > 3 ?
                                    <>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum - 3 <= 3 ? 3 : articleNum - 3)}
                                            className="text-blue-300 pl-2 pb-3 hover:text-blue-400"
                                        >
                                            Show less
                                        </button>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum + 3)}
                                            className="text-blue-300 pr-2 pb-3 hover:text-blue-400"
                                        >
                                            Show more
                                        </button>
                                    </>
                                    :
                                    <button
                                        onClick={() => setRandomUserNum(articleNum + 3)}
                                        className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
                                    >
                                        Show more
                                    </button>
                                }
                            </div>
                        ) : (
                            (users?.length > 3)
                            &&
                            <div className="flex justify-between">
                                {randomUserNum > 3 ?
                                    <>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum - 3 <= 3 ? 3 : articleNum - 3)}
                                            className="text-blue-300 pl-2 pb-3 hover:text-blue-400"
                                        >
                                            Show less
                                        </button>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum + 3)}
                                            className="text-blue-300 pr-2 pb-3 hover:text-blue-400"
                                        >
                                            Show more
                                        </button>
                                    </>
                                    :
                                    <button
                                        onClick={() => setRandomUserNum(articleNum + 3)}
                                        className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
                                    >
                                        Show more
                                    </button>
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
}
