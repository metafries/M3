export function getFileExtension(filename) {
    return filename.slice(filename.lastIndexOf('.') - 1 >>> 0 + 2);
}

export function formatChatData(comments) {

    let hash = Object.create(null);
    comments.forEach(a => hash[a.id] = {...a, replies: []});
    console.log(hash)

    let combinedReply = [];
    comments.forEach(a => {
        if (a.baseId) hash[a.baseId].replies.push(hash[a.id]);
        else combinedReply.push(hash[a.id]);
    });

    return combinedReply;
}