import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ValidationAddProduct } from '../../../utils/ValidationAddProduct'
import { Message } from '../../Message/Message'
import { Navigation } from '../../Navigation/Navigation'
import { Title } from '../../Title/Title'

export const AddProduct = ({ viewAddProducts }) => {
  if (viewAddProducts) {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm()

    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [succes, setSucces] = useState(false)
    const [categoria, setCategoria] = useState([])
    const [subCategoria, setSubCategoria] = useState([])
    const [totalCategoria, setTotalCategoria] = useState([])
    const [selectCategoria, setSelectCategoria] = useState('')
    const [cateError, setCateError] = useState(false)
    const [subcateError, setSubCateError] = useState(false)
    useEffect(() => {
      const getCategoria = async () => {
        await axios.get('http://localhost:3001/api/products/categories')
          .then(resp => {
            console.log(resp.data);
            let hash = {}
            setTotalCategoria(resp.data)
            setCategoria(resp.data.filter((current => {
              let exists = !hash[current.nombre]
              hash[current.nombre] = true
              return exists
            })))
          })
          .catch(error => console.log(error))

      }
      getCategoria()
    }, [])
    useEffect(() =>{
      console.log("select categoria => ", selectCategoria);
      console.log(totalCategoria);
    },[selectCategoria])
    const submit = async (data) => {
      setViewMessage(false)
      setMessage('')
      const { nombre, categoria,  } = data;
      if (categoria === '') {
        console.log(categoria);
      }
      console.log("data ", data);
      console.log("categoria send ", categoria);
      // await axios.post('http://localhost:3001/api/auth/signup', {
      //   nombre,
      //   usuario,
      //   email,
      //   password,
      //   roles
      // })
      //   .then(res => {
      //     setLoading(!loading)
      //     if (res.data.ok) {
      //       if (!admin) {
      //         handleLogin(res.data.logeado)
      //       }
      //       setTimeout(() => {
      //         setSucces(true)
      //         setLoading(false)
      //       }, 2000)

      //     } else {
      //       setLoading(!loading)
      //       setMessage(res.data.message)
      //       setTimeout(() => {
      //         setViewMessage(true)
      //         setLoading(false)
      //       }, 2000)
      //     }
      //   })
    }
    const handleCategoria = (e, option) => {
      console.log("option 1 ", option);

      if (e.target.value !== '') {
        console.log("value !== ' ' =>> ", option);

        if (option === 'categoria') {
          console.log("option ", option);
          setSelectCategoria(e.target.value)
          setCateError(false)
          console.log("categoria seleccionada =>> ",e.target.value);
        }
        console.log("value subcate !== ' ' =>> ", option);

        if (option === 'subcategoria') {
          console.log("option subcate ", option);
          setSelectCategoria(e.target.value)
          setCateError(false)
          setSubCateError(false)
          console.log("subcategoria seleccionada =>> ",e.target.value);
          setValue('categoria',e.target.value)

        }
      }
      else {
        setSubCateError(true)
        setCateError(true)
      }
    }
    return (
      <>

        <div className="container-form">
          <div className="container-form-body">
            <Title title={'Nuevo producto'} bar={false} />
            {viewMessage ?
              (<Message message={message} viewMessage={viewMessage} setViewMessage={setViewMessage} />) : (null)
            }
          </div>
          <form onSubmit={handleSubmit(submit)} className="form-login">
            <div className='row'>
              <div className='col-12  col-md-6'>
                <label name="nombre">Nombre del producto <small>*</small> </label>
                <input name="nombre" className={errors.nombre ? ("form-control is-invalid") : ("form-control")} type="text" {...register('nombre', ValidationAddProduct.nombre)} />
                {errors.nombre ? <small className='text-danger'>{errors.nombre.message}</small> : null}
              </div>
              <div className='col-12  col-md-6'>
                <label name="precio">Precio <small>*</small> </label>
                <input name="precio" type="number" className={errors.precio ? ("form-control is-invalid") : ("form-control")}  {...register('precio', ValidationAddProduct.precio)} />
                {errors.precio ? <small className='text-danger'>{errors.precio.message}</small> : null}
              </div>
              <div className='col-12'>
                <label name="ingredientes">Ingredientes <small>*</small> </label>
                <input name="ingredientes" className={errors.ingredientes ? ("form-control is-invalid") : ("form-control")} type="text" {...register('ingredientes', ValidationAddProduct.ingredientes)} />
                {errors.ingredientes ? <small className='text-danger'>{errors.ingredientes.message}</small> : null}
              </div>
            </div>
            <div className='row'>

              <div className='col-12 col-md-6 '>
                <label name="categoria">Categoria <small>*</small></label>
                <select
                  onChange={(e) => handleCategoria(e, 'categoria')}
                  // onChange={(e) => setSelectCategoria(e.target.value)}
                  name="categoria"
                  className={cateError ? ('form-select form-control is-invalid') : ('form-select form-control')}
                  // {...register('categoria', ValidationAddProduct.categoria)}
                >
                  <option value="" >Seleccione la categoria</option>
                  {categoria.map(categorie => (
                    <option
                      key={categorie._id}
                      value={categorie.nombre}
                    // onChange={(e) => handleCategoria(e)}

                    >{categorie.nombre}</option>
                  ))}
                </select>
                {/* {errors.categoria ? <small className='text-danger'>{errors.categoria.message}</small> : null} */}

              </div>
              <div className='col-12 col-md-6 '>
                <label name="subcategoria">Subcategoria <small>*</small></label>
                <select
                  name="subcategoria"
                  // onChange={(e) => setValue("id_categoria", e.target.value)}
                  onChange={(e) => handleCategoria(e, 'subcategoria')}

                  className={subcateError ? ('form-select form-control is-invalid') : ('form-select form-control')}

                  {...register('subcategoria', ValidationAddProduct.subcategoria)}
                >
                  <option value="" >Seleccione a subcategoria</option>
                  {totalCategoria.filter(subCategoria => subCategoria.nombre === selectCategoria).map(subcategoria => (
                    <option
                      key={subcategoria._id}
                      value={subcategoria._id}
                    >
                      {subcategoria.categoria}
                    </option>
                  ))}
                </select>
                {/* {errors.subcategoria ? <small className='text-danger'>{errors.subcategoria.message}</small> : null} */}

              </div>
            </div>
            <div className='col-12 col-md-12'>
              <label name="description">Description</label>
              <textarea
                name="description"
                className={errors.description ? ("form-control is-invalid") : ("form-control")} type="text"
                maxLength="500"
                minLength="20"
                placeholder='Deje detalles del producto...'
                {...register('description', ValidationAddProduct.description)}
              />
              {errors.description ? <small className='text-danger'>{errors.description.message}</small> : null}
            </div>

            <div className='d-flex flex-row justify-content-around my-4'>
              <div>
                <button type='submit' className='btn-toRegister' >Agregar
                  {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
                </button>
              </div>
              <div>
                <button type='submit' className='btn-toCancel' >Cancelar</button>
              </div>
            </div>
          </form>
        </div>
      </>
    )
  } else {
    return null
  }
}
