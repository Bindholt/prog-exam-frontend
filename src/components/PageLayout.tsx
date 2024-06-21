import {ReactNode} from "react";
import { Toaster } from "react-hot-toast";

function PageLayout({children}:{children: ReactNode}) {
	return (
		<>
		<main className="p-4 relative">
			{children}
		</main>
		<Toaster position={"bottom-center"} />
		</>
		
	);
}

export default PageLayout;