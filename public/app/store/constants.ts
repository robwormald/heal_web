import { User, UserList, PollView, PollList, ServerMonitor, Article, ArticleList, Comment } from './../objects/index';
export { User, UserList, PollView, PollList, ServerMonitor, Article, ArticleList, Comment }

export interface AppState {
  onlineUsers: User[];
  latestPoll: PollView;
  serverMonitors: ServerMonitor[];

  currentUser: User;
  currentViewUser: User;
  currentComment: Comment[];
  currentArticle: Article;
  currentPoll: PollView;

  pollList: PollList;
  userList: UserList;
  articleList: ArticleList;
  commentList: Comment[];
};

export const SET_CURRENT_USER           = 'SET_CURRENT_USER';
export const SET_ONLINE_USERS           = 'SET_ONLINE_USERS';
export const ADD_ONLINE_USER            = 'ADD_ONLINE_USER';
export const REMOVE_ONLINE_USER         = 'REMOVE_ONLINE_USER';
export const UPDATE_ONLINE_USER         = 'UPDATE_ONLINE_USER';
export const SET_LATEST_POLL            = 'SET_LATEST_POLL';
export const SET_ARTICLE_LIST           = 'SET_ARTICLE_LIST';
export const SET_CURRENT_ARTICLE        = 'SET_CURRENT_ARTICLE';
export const SET_POLL_LIST              = 'SET_POLL_LIST';
export const SET_CURRENT_POLL           = 'SET_CURRENT_POLL';
export const SET_CURRENT_VIEWUSER       = 'SET_CURRENT_VIEWUSER';
export const SET_USER_LIST              = 'SET_USER_LIST';
export const COMMENT_LIST               = 'COMMENT_LIST';
export const COMMENT_CREATE             = 'COMMENT_CREATE';
export const COMMENT_DELETE             = 'COMMENT_DELETE';
export const COMMENT_EDIT               = 'COMMENT_EDIT';
export const COMMENT_UPDATE             = 'COMMENT_UPDATE';
export const COMMENT_CURRENT            = 'COMMENT_CURRENT';
