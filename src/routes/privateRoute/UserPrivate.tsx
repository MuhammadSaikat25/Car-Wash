import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

type Props = {
  children: ReactNode;
};

const UserPrivate = ({ children }: Props) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
   
  if (!user || user.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UserPrivate;
