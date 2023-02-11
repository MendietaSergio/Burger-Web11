import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Description } from '../components/Container/Description/Description'
import { ItemDetail } from '../components/Container/ItemDetail/ItemDetail'
import { Ratings } from '../components/Container/Ratings/Ratings'
import { FeaturedProduct } from '../components/FeaturedProduct/FeaturedProduct'
import { SkeletonCard } from '../components/Skeleton/SkeletonCard'
export const Detail = () => {
  const [showLine, setShowLine] = useState(true)
  const [loading, setLoading] = useState(true);
  const { idDetail } = useParams()
  const [productDetail, setProductDetail] = useState({})
  const [success, setSuccess] = useState(true)


  const getProductDetail = async () => {
    await axios.get(`http://localhost:3001/api/products/detail/${idDetail}`)
      .then(res => {
        setProductDetail(res.data.productDetail)
      }).finally(() => setTimeout(() => setLoading(false), 3000))
  }
  useEffect(() => {
    setLoading(true)
    getProductDetail()
  }, [idDetail])
  return (
    <>
      <div className='container'>
        <div className='container-detail'>
          <div className="row">
            <ItemDetail productDetail={productDetail} loading={loading} success={success} />
          </div>
          <div className='row'>
            <hr />
            <div className="col-12 container-options">
              <div className='container-options-detail' onClick={() => setShowLine(true)}>
                <h6 className='view-options' >Descripción</h6>
                <span className={showLine ? 'active-line-red' : null}></span>
              </div>
              <div className='container-options-detail' onClick={() => setShowLine(false)}>
                <h6 className='view-options'>Valoraciones</h6>
                <span className={showLine ? null : 'active-line-red'} ></span>
              </div>
            </div>
          </div>
          <div className="row">
            {showLine ? (loading ? (
              <SkeletonCard
                skeletonDetail={true}
                viewDescription={true}
              />
            ) : (
              <Description />
            )
            ) : (
              <Ratings />
            )}
          </div>
        </div>
        <div className="row">
          <FeaturedProduct relatedView={true} productDetail={productDetail} setSuccess={setSuccess} />
        </div>
      </div>
      {/* )} */}
    </>
  )
}
