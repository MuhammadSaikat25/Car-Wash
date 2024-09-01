import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";


const UserHero = () => {
    const user=useAppSelector((state:RootState)=>state.auth.user)
    return (
        <div>
            <h1>{user?.name}</h1>
        </div>
    );
};

export default UserHero;