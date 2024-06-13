const ProfilePage = ({ params }: { params: { slug: string } }) => {
  return <div className='h-screen'>Profile Page {params.slug}</div>;
};

export default ProfilePage;
