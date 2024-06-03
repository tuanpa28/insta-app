const ProfilePage = ({ params }: { params: { slug: string } }) => {
  return <div>Profile Page {params.slug}</div>;
};

export default ProfilePage;
