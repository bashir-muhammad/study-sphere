const Learn = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Learn Page - ID: {params.id}</h1>
      {/* Add your learning content here */}
    </div>
  );
};

export default Learn;
