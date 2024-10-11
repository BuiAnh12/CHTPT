import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className='w-full pt-5'>
      <div className='bg-[#166987] border border-[#166987]'>
        <br />
        <div className='w-[80%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 ms:px-6 lg-px-8'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-white'>About</h3>
              <ul className='space-y-4'>
                <li>
                  <Link href='/' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    About us
                  </Link>
                </li>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Products and Service
                  </Link>
                </li>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Ways to Watch
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-white'>Cooperation</h3>
              <ul className='space-y-4'>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Corporate relations
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-white'>Help and support</h3>
              <ul className='space-y-4'>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Security Response Center
                  </Link>
                </li>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className='space-y-3'>
              <h3 className='text-[18px] font-[600] text-white'>Terms of Service</h3>
              <ul className='space-y-4'>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='' className='text-[14px] text-gray-300 hover:text-[#e2aa11]'>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
