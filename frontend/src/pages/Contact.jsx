import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      {/* Contact Us Section */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact Us"/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>1234 Elm Street<br />Springfield, USA</p>
          <p>Tel: (+1) 555-0199<br />E-mail: support@example.com</p>
          <p className='font-semibold text-xl text-gray-600'>Join Our Team</p>
          <p className='text-gray-500'>We're always hiring—check out current openings or send your resume to careers@example.com.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>View Openings</button>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  )
}

export default Contact
