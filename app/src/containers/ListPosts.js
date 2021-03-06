import { connect } from 'react-redux'
import AllPosts from './../components/AllPosts'
import CategoryPosts from './../components/CategoryPosts'
import {
  fetchAllPosts,
  sortTypes,
  changeSortOrder,
  updatePostScoreToServer,
  deletePostToServer
} from './../actions'

const { VOTE_SCORE, TIME_STAMP } = sortTypes

const getSortedPosts = (allPosts, posts, sortOrder) => {
  let sortedPostIds;

  switch (sortOrder) {
    case VOTE_SCORE:
      sortedPostIds = allPosts.sort(function(a,b) {
        return posts[b].voteScore - posts[a].voteScore
      })
      return sortedPostIds
    case TIME_STAMP:
      sortedPostIds = allPosts.sort(function(a,b) {
        return posts[b].timestamp - posts[a].timestamp
      })
      return sortedPostIds
    default:
      return allPosts
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  sortOrder: state.sortOrder,
  sortedPostIds: getSortedPosts(state.allPosts, state.posts, state.sortOrder)
})

const mapDispatchToProps = {
  sortPosts: changeSortOrder,
  getAllPosts: fetchAllPosts,
  updateSinglePostVote: updatePostScoreToServer,
  deletePost: deletePostToServer
}

export const ListAllPosts = connect(mapStateToProps, mapDispatchToProps)(AllPosts)

export const ListCategoryPosts = connect(mapStateToProps, mapDispatchToProps)(CategoryPosts)
