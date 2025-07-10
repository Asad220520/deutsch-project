export default function ProfileDetails({ user }) {
  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Профиль</h2>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      {user.displayName && (
        <div>
          <strong>Имя:</strong> {user.displayName}
        </div>
      )}
    </div>
  );
}
