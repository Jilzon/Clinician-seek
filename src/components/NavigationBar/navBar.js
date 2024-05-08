import Avatar from "../Avatar/avatar";
export default function Navbar({ avatar, avatarName }) {
  return (
    <div className="w-full flex justify-end bg-[#E0FEE1] gap-2 items-center py-3 px-4">
      {avatar && <Avatar image={avatar} name={avatarName} />}
    </div>
  );
}
