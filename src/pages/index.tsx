import { Header, Input } from '@/components'

export default function Home() {
  return (
    <>
      <main>
        <Header right={<Input />}/>
        <h1 className="text-3xl font-bold underline text-red-500">
          Hello world!
        </h1>
      </main>
    </>
  )
}
