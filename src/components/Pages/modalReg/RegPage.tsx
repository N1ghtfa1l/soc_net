import * as Form from "@radix-ui/react-form";
import 'react-toastify/dist/ReactToastify.css';
import TextBox from "../../../UI/TextBox";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { requestPost } from "../../API/funcAPi";
import { regResponse } from "../../API/interfaceAPI";




const RegPage = () => {
	const [email, setEmail] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [password, setPass] = useState<string>("")
	const [error, setError] = useState<boolean>(false)
	const location = useLocation().pathname === "/auth"
	const navigate = useNavigate()

	useEffect(() => {
		if (name.length < 4 && name.length) {
			setError(true)
		} else {
			setError(false)
		}
	}, [name])


	const userReg = async (click: React.MouseEvent) => {
		click.preventDefault()
		const userData = {
			email,
			password,
			name
		}
		const response = await requestPost("/user/register", userData)
		setEmail("")
		setName("")
		setPass("")

		if ('detail' in response) {
			toast(`${response.detail}`)
			return
		}


	}
	const userAuth = async (click: React.MouseEvent) => {
		click.preventDefault()
		const userData = {
			email,
			password,
			name
		}
		const response = await requestPost("/auth", userData) as regResponse
		setEmail("")
		setName("")
		setPass("")
		if ('detail' in response) {
			toast(`${response.detail}`)
			return
		}
		console.log(response)
		localStorage.setItem('name', response.name)
		localStorage.setItem('email', response.email)
		localStorage.setItem('id', response.id)
		navigate('/profile')

	}


	return (
		<div className="h-screen bg-[#202124]">
			<Form.Root className="w-[260px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2">
				<div className="font-bold text-white text-2xl">{location ? "Авторизация" : "Регистрация"}</div>
				<TextBox
					label="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)} />
				<TextBox
					label="name"
					error={error}
					description="Имя должно содерждать больше 4 символов"
					value={name}
					onChange={(e) => setName(e.target.value)} />
				<TextBox
					label="password"
					type="password"
					value={password}
					onChange={(e) => setPass(e.target.value)} />

				<Form.Submit asChild>
					<button onClick={location ? userAuth : userReg} className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
						{location ? "Авторизоваться" : "Зарегистрироваться"}
					</button>
				</Form.Submit>
				<div className="text-white text-sm underline">{location ? <Link to={"/login"}>Нет аккаунта? Зарегистрируйся!</Link> : <Link to={"/auth"}>Есть аккаунт? Авторизируйся!</Link>}</div>

			</Form.Root>
			<ToastContainer />
		</div>

	)
};

export default RegPage;
