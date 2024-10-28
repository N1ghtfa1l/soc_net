import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { requestGet } from "./components/API/funcAPi";
import { toast } from "react-toastify";
import Header from "./UI/Header";
import { authRoutes, publicRoutes } from "./components/routes/routes";


function App() {
  const [auth, isAuth] = useState<boolean>(false)
  const location = useLocation().pathname === "/auth"

  useEffect(() => {
    fetchData()
  }, [localStorage.length > 0])

  const fetchData = async () => {
    const response = await requestGet("/user/auth")
    //@ts-ignore
    if (response.message === "ok" && localStorage.length > 0) {
      isAuth(true)
    } else {
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('id')
      isAuth(false)
      location && toast('Авторизируйтесь!')
    }
  }

  return (
    <>
      {auth && <Header />}
      <Routes>
        {auth ? (
          authRoutes.map(({ path, Component }) => (
            <Route path={path} element={<Component />} key={path} />
          ))
        ) : (
          publicRoutes.map(({ path, Component }) => (
            <Route path={path} element={<Component />} key={path} />
          ))
        )}
        {auth && <Route path="*" element={<Navigate to="/" replace />} />}
        {!auth && <Route path="*" element={<Navigate to="/login" replace />} />}

      </Routes>
    </>
  )
}

export default App
