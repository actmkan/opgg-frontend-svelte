import request from "./request";

export const getTalks = () => {
    return request.get("/talks");
};

export const getTalk = (id) => {
    return request.get(`/talks/${id}`);
};

export const getChannels = (id) => {
    return request.get(`/talks/${id}/channels`);
};

export const getArticles = (talkId, channelId, category, page, perPage, searchType, searchText) => {
    return request.get(
        `/talks/${talkId}/channels/${channelId}/articles?sort=${category}&page=${page}&per_page=${perPage}&search_type=${searchType}&search_text=${searchText}`
    );
};

export const getArticle = (talkId, channelId, articleId) => {
    return request.get(`/talks/${talkId}/channels/${channelId}/articles/${articleId}`);
};

export const getComments = (talkId, channelId, articleId, category, page, perPage) => {
    return request.get(
        `/talks/${talkId}/channels/${channelId}/articles/${articleId}/comments?sort=${category}&page=${page}&per_page=${perPage}`
    );
};

export const createComment = (articleId, parentId, content, imageId) => {
    return request.post(`/comments`, {
        articleId,
        parentId,
        content,
        imageId,
    });
};

export const toggleLike = (target, targetId, type) => {
    return request.post(`/likes`, {
        target,
        targetId,
        type,
    });
};
export const createArticle = (talkId, channelId, title, content) => {
    return request.post(`/articles`, {
        talkId,
        channelId,
        title,
        content,
    });
};

export const updateArticle = (talkId, channelId, articleId, title, content) => {
    return request.put(`/articles/${articleId}`, {
        talkId,
        channelId,
        articleId,
        title,
        content,
    });
};

export const deleteArticle = (articleId) => {
    return request.delete(`/articles/${articleId}`);
};
