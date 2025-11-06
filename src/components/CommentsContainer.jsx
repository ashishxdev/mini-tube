import React from 'react'

const commentsData = [
    {
        name: "Aashish",
        text: "lorem ipsum dolor add me not okay",
        replies: [],
    },
    {
        name: "Aashish",
        text: "lorem ipsum dolor add me not okay",
        replies: [],
    },
    {
        name: "Aashish",
        text: "lorem ipsum dolor add me not okay",
        replies: [],
    },
    {
        name: "Aashish",
        text: "lorem ipsum dolor add me not okay",
        replies: [
            {
                name: "Aashish",
                text: "lorem ipsum dolor add me not okay",
                replies: [],
            },
            {
                name: "Aashish",
                text: "lorem ipsum dolor add me not okay",
                replies: [
                    {
                        name: "Aashish",
                        text: "lorem ipsum dolor add me not okay",
                        replies: [],
                    }, {
                        name: "Aashish",
                        text: "lorem ipsum dolor add me not okay",
                        replies: [],
                    },
                ],
            },
        ],
    }
]

const Comment  = ({data}) => {
    const { name, text, replies } = data;
     return <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2'>
        <img 
        className='w-12 h-12'
        src="https://cdn-icons-png.flaticon.com/512/6914/6914292.png" alt="user"/>
        <div className='px-3'>
            <p className='font-bold'>{name}</p>
            <p>{text}</p>
        </div>
     </div>
}

const CommentList = ({comments}) => {
    // Disclaimer: Don't use indexes as keys
    return comments.map((comment, index)=> (
        <div key={index}>
            <Comment  data={comment}/>
        <div className='pl-5 border border-l-black ml-5'>
            <CommentList comments={comment.replies}/>
        </div>
        </div>
    ))
}

const CommentsContainer = () => {
    return (
        <div className='m-5 p-2'>
            <h1 className='text-2xl font-bold'>Comments:</h1>
            <CommentList comments={commentsData}/>
        </div>
    )
}

export default CommentsContainer
