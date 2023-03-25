import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Description } from '../components/Container/Description/Description'
import { ItemDetail } from '../components/Container/ItemDetail/ItemDetail'
import { Ratings } from '../components/Container/Ratings/Ratings'
import { FeaturedProduct } from '../components/FeaturedProduct/FeaturedProduct'
import { SkeletonCard } from '../components/Skeleton/SkeletonCard'
import { useDetail } from '../hooks/useDetail'
import { ErrorFound } from './ErrorFound'
export const Detail = () => {
  const { idDetail } = useParams()
  const [showLine, setShowLine] = useState(true)
  const {
    getProductDetail,
    loading,
    setLoading,
    productDetail,
    success,
    setSuccess,
    status
  } = useDetail()
  useEffect(() => {
    setLoading(true)
    setShowLine(true)
    getProductDetail({ idDetail })
  }, [idDetail])
  if (!status) return <ErrorFound />
  else {
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
                <Description descripcion={productDetail.descripcion} />
              )
              ) : (
                <Ratings productDetail={productDetail} />
              )}
            </div>
          </div>
          <div className="row">
            <FeaturedProduct relatedView={true} productDetail={productDetail} setSuccess={setSuccess} />
          </div>
        </div>
      </>
    )
  }
}
