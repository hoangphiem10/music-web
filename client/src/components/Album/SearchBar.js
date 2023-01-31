import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getListSongs } from '../../redux/songSlice'
import { useNavigate, useParams } from 'react-router-dom'
import musicService from '../../services/musicService'
import axios from '../../api'
import authService from '../../services/authService'
import { loginSuccess } from '../../redux/authSlice'
const SearchBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const user = useSelector((state) => state.auth.login.currentUser)
  // const accessToken = user?.accessToken ? user?.accessToken : null
  // let axiosJWT = authService.createAxios(user, dispatch, loginSuccess, navigate)
  const [search, setSearch] = useState('')
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`listSongs/getAllSongs/${id}`)
      .then((res) => {
        if (search) {
          dispatch(
            getListSongs(
              res.data.filter((song) =>
                song.name.toLowerCase().includes(search.toLowerCase()),
              ),
            ),
          )
        } else {
          dispatch(getListSongs(res.data))
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [search])

  return (
    <div className="search__bar">
      <SearchOutlined />
      <input
        onChange={(e) => {
          setSearch(e.target.value)
          console.log(search)
        }}
        value={search}
        type="text"
        placeholder="Artists, songs, or podcasts"
      />
    </div>
  )
}

export default SearchBar
