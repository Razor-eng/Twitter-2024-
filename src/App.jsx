import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { ThemeProvider } from "next-themes"
import { Toaster } from "react-hot-toast"
import Sidebar from "./components/layout/Sidebar"
import Widgets from "./components/layout/Widgets"
import ContextProvider from "./context/Context"
import LoginModal from "./components/modal/LoginModal"
import RegisterModal from "./components/modal/RegisterModal"
import Post from "./pages/Post"
import Explore from "./pages/Explore"
import Notification from "./pages/Notification"
import User from "./pages/User"
import EditModal from "./components/modal/EditModal"

function App() {
  return (
    <ContextProvider>
      <div className="h-screen">
        <ThemeProvider enableSystem={true} attribute='class'>
          <BrowserRouter>
            <div className="dark:bg-black dark:text-gray-200 text-gray-700 transition-colors duration-300 min-h-screen">
              <div className="container h-full mx-auto xl:px-30 max-w-7xl">
                <div className="grid grid-cols-4 h-full">
                  <Toaster />
                  <LoginModal />
                  <RegisterModal />
                  <EditModal />
                  <Sidebar />
                  <div
                    className="
              min-h-screen
              col-span-4 
              lg:col-span-2 
              border-x 
              dark:border-neutral-800
          ">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/notifications" element={<Notification />} />
                      <Route path="/posts/:postId" element={<Post />} />
                      <Route path="/users/:userId" element={<User />} />
                    </Routes>
                  </div>
                  <Widgets />
                </div>
              </div>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </ContextProvider>
  )
}

export default App
