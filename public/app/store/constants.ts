import { User, UserList, PollView, PollList, ServerMonitor, Article, ArticleList } from './../objects/index';
export { User, UserList, PollView, PollList, ServerMonitor, Article, ArticleList }

export interface AppState {
  onlineUsers: User[];
  currentUser: User;
  currentViewUser: User;
  userList: UserList;
  currentPoll: PollView;
  latestPoll: PollView;
  pollList: PollList;
  serverMonitors: ServerMonitor[];
  currentArticle: Article;
  articleList: ArticleList;
};

export const SET_CURRENT_USER    = 'SET_CURRENT_USER';
export const SET_ONLINE_USERS    = 'SET_ONLINE_USERS';
export const ADD_ONLINE_USER     = 'ADD_ONLINE_USER';
export const REMOVE_ONLINE_USER  = 'REMOVE_ONLINE_USER';
export const UPDATE_ONLINE_USER  = 'UPDATE_ONLINE_USER';
export const SET_LATEST_POLL     = 'SET_LATEST_POLL';
export const SET_ARTICLE_LIST    = 'SET_ARTICLE_LIST';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const SET_POLL_LIST       = 'SET_POLL_LIST';
export const SET_CURRENT_POLL    = 'SET_CURRENT_POLL';
