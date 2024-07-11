import Image from 'next/image';
import Link from 'next/link';
const Header = () => {
  
  const Menu=[
    {
        id:1,
        name:'Home',
        path:'/'
    },
    {
        id:2,
        name:'Blog',
        path:'/posts'
    },
    {
        id:4,
        name:'Contact Us',
        path:'/contact'
    },
  ]
  return (
    <div className='flex items-center justify-between p-4 '>
        <div className="flex items-center gap-80">
            <Image src={'/logoipsum-284.svg'} alt="logo"
                width={100} height={60}
            />
            <ul className="md:flex gap-8 hidden">
                { Menu.map((item, index)=>(
                    <Link href={item.path} key={index}>
                        <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">{item.name}</li>
                    </Link>
                ))

                }
            </ul>
        </div>
        <Link href='/' className='inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white'>Get Started</Link>
    </div>
  )
}

export default Header