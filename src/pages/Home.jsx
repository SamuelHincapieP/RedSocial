import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import RightSidebar from '../components/RightSidebar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w3-container w3-content" style={{ maxWidth: 1400, marginTop: 80 }}>
        <div className="w3-row">
          <Sidebar />
          <Feed />
          <RightSidebar />
        </div>
      </div>
      <Footer />
    </>
  )
}
