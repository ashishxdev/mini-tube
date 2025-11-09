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
     return <div className='flex shadow-sm bg-gray-900 p-2 w-[95vw] md:w-[990px] rounded-lg my-1 mx-auto text-gray-200'>
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
    return comments.map((comment)=> (
        <div key={comment.id || comment.name}>
            <Comment data={comment}/>
        <div className='pl-5 ml-5'>
            <CommentList comments={comment.replies}/>
        </div>
        </div>
    ))
}
const CommentsContainer = ({ comments = [] }) => {
    const formattedComments = comments.map((comment, index) => ({
        id: comment.id,
        name: comment.snippet.topLevelComment.snippet.authorDisplayName,
        text: comment.snippet.topLevelComment.snippet.textDisplay,
        replies: [] 
    }))

    return (
        <div className='m-0 mt-0 p-2 ml-0'>
            <h1 className='text-2xl font-bold text-white mb-4'>
                {comments.length > 0 ? `${comments.length} Comments` : 'Comments'}
            </h1>
            {formattedComments.length > 0 ? (
                <CommentList comments={formattedComments}/>
            ) : (
                <p className="bg-black">Loading comments...</p>
            )}
        </div>
    )
}

export default CommentsContainer
