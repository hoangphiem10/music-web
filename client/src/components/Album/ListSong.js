import { Input, Space, Table, Tag } from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import AddSong from './AddSong'
import '../../assets/scss/listsong.scss'

const ListSong = () => {
  const columns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#',
      align: 'center',
      //   sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      sorter: (a, b) => {
        return a.price - b.price
      },
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      align: 'center',
      //   filteredValue: (filteredInfo.name || [ filteredName ]) || null,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input.Search
            placeholder="Type text here"
            className="search-name"
            value={selectedKeys[0]}
            onChange={(e) => {
              //   setSelectedKeys(e.target.value ? [ e.target.value ] : [])
              //   setFilteredName(e.target.value ? e.target.value : '')
            }}
            onSearch={() => {
              confirm()
            }}
          />
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      },
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'image',
    //   key: 'image',
    //   align: 'center',
    //   width: 400,
    //   render: (images) =>
    //     images.map((image, idx) => {
    //       return (
    //         <img
    //           key={idx}
    //           src={image}
    //           alt=""
    //           style={{ width: '80px', marginTop: '10px' }}
    //         />
    //       )
    //     }),
    // },
    {
      title: 'Album',
      dataIndex: 'Album',
      key: 'Album',
      align: 'center',
      //   sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      sorter: (a, b) => {
        // return a.price - b.price
      },
    },
    {
      title: 'Date added',
      dataIndex: 'Date added',
      key: 'Date added',
      align: 'center',
      //   sortOrder: sortedInfo.columnKey === 'remained' ? sortedInfo.order : null,
      //   sorter: (a, b) => a.remained - b.remained,
    },
    {
      title: 'Duration',
      key: 'Duration',
      dataIndex: 'Duration',
      align: 'center',
      render: (_, { colors }) => (
        <>
          {colors.map((color) => {
            return (
              <Tag color={color} key={color} style={{ marginTop: '10px' }}>
                <Space size="middle">{color.toUpperCase()}</Space>
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (record) => (
        <Space size="middle" style={{}}>
          {/* <EditButton 
                editProduct = {record}
              /> */}
          <DeleteOutlined
            style={{ fontSize: '18px', color: 'red' }}
            onClick={() => {
              //   onDeleteStudent(record)
            }}
          />
        </Space>
      ),
    },
  ]
  return (
    <>
      <AddSong />
      {/* <Table
        className="music-table"
        columns={columns}
        // dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 450 }}
      /> */}
    </>
  )
}

export default ListSong
