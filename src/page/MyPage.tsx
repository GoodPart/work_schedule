import { useSelector } from "react-redux"
import { RootState } from "../modules"

export default function MyPage() {
    const authData = useSelector((state: RootState) => state.authCheckReducer);
    return (
        <>
            <h2>myPage!</h2>
            <br />
            <p>
                {
                    authData.auth.team_name
                }
            </p>
            <p>
                {
                    authData.auth.user_name
                }
            </p>
            <p>
                {
                    authData.auth.user_email
                }
            </p>
            <p>
                {
                    authData.auth.user_phn
                }
            </p>
            <p>
                {
                    authData.auth.user_email
                }
            </p>
        </>

    )
}