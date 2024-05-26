import Login from "@/Components/Login";

export default function Home() {
  return (
    <main className='grid place-items-center '>
      <h1 className='text-3xl font-bold text-center mt-6'>
        Oracle DB Connection
      </h1>
      <Login />
    </main>
  );
}
