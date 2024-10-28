import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC, ReactNode } from "react";


interface DialogProps {
	nameInput: ReactNode
	descInput: ReactNode
	createPosts: () => void;
}

const DialogPost: FC<DialogProps> = ({ nameInput, descInput, createPosts }) => (
	<Dialog.Root>
		<Dialog.Trigger asChild>
			<button className="inline-flex h-[35px] items-center justify-center rounded bg-white px-[15px] mt-[10px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
				Добавить новый пост
			</button>
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
			<Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
				<Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
					Добавить новый пост
				</Dialog.Title>
				<Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
					Укажите на какую тему вы хотите создать пост. И укажите ее описание.
				</Dialog.Description>
				<fieldset className="mb-[15px] flex items-center gap-5">
					<label
						className="w-[90px] text-right text-[15px] text-violet11"
						htmlFor="name"
					>
						Название поста
					</label>
					{nameInput}
				</fieldset>
				<fieldset className="mb-[15px] flex items-center gap-5">
					<label
						className="w-[90px] text-right text-[15px] text-violet11"
						htmlFor="username"
					>
						Описание поста
					</label>
					{descInput}
				</fieldset>
				<div className="mt-[25px] flex justify-end">
					<Dialog.Close asChild>
						<button onClick={createPosts} className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none">
							Создать пост
						</button>
					</Dialog.Close>
				</div>
				<Dialog.Close asChild>
					<button
						className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
						aria-label="Close"
					>
						<Cross2Icon />
					</button>
				</Dialog.Close>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default DialogPost;
