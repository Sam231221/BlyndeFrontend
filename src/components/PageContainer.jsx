import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
function PageContainer({ children }) {
    return (
        <>
        <Header/>
          {children}
        <Footer/>
        </>

    )
}

export default PageContainer
