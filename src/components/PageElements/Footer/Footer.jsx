import './Footer.css'
// function Footer(){
//     return(
//         <footer>
//             <div>
//                 <p>
//                    Contact Us 
//                 </p>
                
//             </div>
//             <div>
//                 <p>Privacy policy</p>
//             </div>
//         </footer>
//     )
// }

// export default Footer

function Footer() {
  return (
    <footer>
      <div className="footer-top" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>No where, but everywhere, all at once</p>
          <p>Email: info@loremipsum.com</p>
          <p>Phone: +123 456 7890</p>
        </div>


      </div>

      {/* Bottom */}
      <div className="footer-bottom" style={{ textAlign: "center", marginTop: "30px", borderTop: "1px solid #555", paddingTop: "20px" }}>
        <p>© {new Date().getFullYear()} Lorem Ipsum. All Rights Reserved.</p>
        <p><a href="/privacy" style={{ color: "#fff" }}>Privacy Policy</a></p>
      </div>
    </footer>
  )
}

export default Footer
