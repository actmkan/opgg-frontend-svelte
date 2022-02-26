import { get, writable } from "svelte/store";
import { getArticle, getArticles, getChannels, getComments, getTalk } from "../api/talk";
import { push, replace } from "svelte-spa-router";
import { DEFAULT_PAGINATION } from "../constants";

export const talk = writable<null|object>(null);
export const channels = writable([]);
export const channelRows = writable([]);

export const articles = writable([]);
export const channel = writable<null|object>(null);
export const article = writable<null|object>(null);
export const comments = writable([]);
export const pagination = writable<object>(DEFAULT_PAGINATION);
export const sort = writable('new');
export const searchType = writable('title');
export const searchText = writable('');

export const commentPagination = writable<object>(DEFAULT_PAGINATION);
export const commentSort = writable('top');

export const fetchTalk = (talkId) => {
  getTalk(talkId)
    .then((r) => {
      talk.set(r.data.data);
    })
    .catch(() => {
      alert("서버에서 톡 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });
};

export const fetchArticle = (talkId, channelId, articleId) => {
  getArticle(talkId, channelId, articleId)
    .then((r) => {
      article.set(r.data.data);
    })
    .catch(() => {
      alert("서버에서 글 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });
};
export const fetchComments = (talkId, channelId, articleId, page) => {
  const sortName = get(commentSort);
  const commentData = get(comments);
  const paginationInfo: any = get(commentPagination);

  getComments(talkId, channelId, articleId, sortName, page, paginationInfo?.perPage)
    .then((r) => {
      comments.set([...commentData, r.data.data]);

      commentPagination.set({
        ...paginationInfo,
        total: r.data.meta.total,
        currentPage: r.data.meta.current_page,
        lastPage: r.data.meta.last_page,
      })
    })
    .catch(() => {
      alert("서버에서 댓글 목록을 불러오는데 실패 했습니다.");
      window.location.reload();
    });
};



export const fetchChannels = async (talkId) => {

  let groups = [];
  const tempChannels = [];

  await getChannels(talkId)
    .then((r) => {
      channelRows.set(r.data.data);
      groups = [...new Set(r.data.data.map((channel) => channel.group))];
    })
    .catch(() => {
      alert("서버에서 채널 목록 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });

  groups.map((group) => {
    const attr = {
      group,
      displayGroup: null,
      child: [],
    };
    const arr = get(channelRows).filter((channel) => channel.group === group);
    attr.displayGroup = arr[0].display_group;
    attr.child = arr;
    tempChannels.push(attr);
  });

  channels.set([...tempChannels]);

};

export const setChannel = (talkId, channelId, sortName, useFetch = true) => {

  let rows = get(channelRows)

  let applyChannel = null;
  rows.map((c) => {
    if (c?.id === parseInt(channelId)) {
      channel.set(c);
      applyChannel = c;
    }
  });

  if(applyChannel === null){
    channel.set({
      id: 'all'
    });
  }


  searchType.set('title')
  searchText.set('')
  sort.set(sortName)

  if(useFetch){
    replace(`/talk/${talkId}/${channelId}?sort=${sortName}`).then(() => fetchArticles(1));
  }
};

export const setSort = (sortName) => {
  const talkInfo: any = get(talk);
  const channelInfo: any = get(channel);
  sort.set(sortName)
  searchText.set('')
  searchType.set('title')
  replace(`/talk/${talkInfo.id}/${channelInfo.id}?sort=${sortName}`).then(() => fetchArticles(1));
};

export const onSearch = () => {
  if(!get(searchText)){
    alert('검색어를 입력해주세요.');
    return;
  }
  fetchArticles(1);
};
export const fetchArticles = (page) => {

  const talkInfo: any = get(talk);
  const channelInfo: any = get(channel);
  const sortName = get(sort);
  const paginationInfo: any = get(pagination);

  getArticles(talkInfo?.id, channelInfo?.id, sortName, page, paginationInfo?.perPage, get(searchType), get(searchText))
    .then((r) => {
      articles.set(r.data.data);

      pagination.set({
        ...paginationInfo,
        total: r.data.meta.total,
        currentPage: r.data.meta.current_page,
        lastPage: r.data.meta.last_page,
      })
      if (get(searchText)) {
        sort.set('new');
      }
    })
    .catch(() => {
      alert("서버에서 글목록을 불러오는데 실패 했습니다.");
      window.location.reload();
    });
};
