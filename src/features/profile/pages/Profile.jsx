import { useSelector } from "react-redux";
import ProfileDetails from "../components/ProfileDetails";
import GuestProfileCards from "../components/GuestProfileCards";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return user ? <ProfileDetails user={user} /> : <GuestProfileCards />;
}
