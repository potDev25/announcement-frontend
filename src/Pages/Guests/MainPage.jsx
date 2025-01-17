import React from 'react'
import Announcment from '../../components/Announcement';
import Pagination from '../../components/Pagination';

const annoucements = [
  {
    title: 'Sample 1',
    body: 'Announcements',
    posted_by: 'Neil Bryan Gaviola',
    date: '2024-10-07'
  },
  {
    title: 'Sample 2',
    body: 'Announcements',
    posted_by: 'Neil Bryan Gaviola',
    date: '2024-10-07'
  },
  {
    title: 'Sample 3',
    body: 'Announcements',
    posted_by: 'Neil Bryan Gaviola',
    date: '2024-10-07'
  },
];

export default function MainPage() {
  return (
    <div>
       <h1 className='mb-2 font-bold uppercase text-gray-700 -tracking-wide text-lg'>Announcments</h1>
     {
      annoucements.map((announcement, key) => (
        <Announcment
          title={announcement.title}
          body={announcement.body}
          posted_by={announcement.posted_by}
          date={announcement.date}
        />
      ))
     }

     <Pagination/>
    </div>
  )
}
