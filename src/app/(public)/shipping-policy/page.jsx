"use client"
import BackBtn from '@/components/BackBtn';
import styles from './page.module.css'

const page = () => {
  return (
    <>
      <BackBtn />
      <div className={styles.mainContainer}>
        <article className={styles.content}>
          <h1 className={styles.h1}>Shipping Policy</h1>
          <section className={styles.section}>
            <ol>
              <li>
                <p>
                  Dr. Vandy’s Lab (“We”, “Our” or “Us”) can ship products almost
                  anywhere in India other than a few locations, which our logistic
                  partners do not serve. When you place an order, we will estimate
                  delivery dates based upon the availability of your item(s) and
                  your shipment's destination. The estimated delivery dates may
                  however differ from actual delivery dates and a failure to
                  comply with the estimated delivery date will not give rise to
                  any cause of action against us. We usually get your shipment
                  delivered within 3 - 15 business days of your placing the order
                  on our website depending on the location.
                </p>
              </li>
              <li>
                <p>
                  If there is any further delay in shipping the products, one of
                  our customer support executives will contact you regarding the
                  same.
                </p>
              </li>
              <li>
                <p>
                  We use high quality corrugated shipping box to reduce transit
                  breakage and pilferage. Our courier partner captures
                  non-delivered items information in real time and tries to
                  deliver the next day.
                </p>
              </li>
              <li>
                <h2>Domestic Shipment</h2>
                <p>
                  Shipping charges will be calculated based on the location and
                  weight of the products. Even though we try our best to ensure
                  on-time delivery, there are certain conditions under which the
                  delivery may get delayed:
                </p>
                <ul className={styles.list}>
                  <li>Incorrect shipping address</li>
                  <li>Incorrect PIN code</li>
                  <li>Nobody available at shipping address</li>
                  <li>Extreme weather conditions</li>
                  <li>Force Majeure</li>
                  <li>
                    Unforeseen circumstances beyond the Control of our logistics
                    partners
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  We send you a confirmation email / SMS once the order is shipped
                  and another email when the order is delivered. Our Courier
                  partner will deliver the product to you at the address provided
                  by you.
                </p>
              </li>
              <li>
                <p>
                  You may collect it after signing the acknowledgement with a
                  Contact No. It is mandatory to give Telephone # or Mobile # of
                  the person who receives the package.
                </p>
              </li>
              <li>
                <p>
                  The customer should possess any one of the following documents
                  as ID proof to take delivery of the product:
                </p>
                <ul className={styles.list}>
                  <li>PAN Card</li>
                  <li>Driving License</li>
                  <li>Passport</li>
                  <li>Voter ID Card</li>
                  <li>Aadhar Card</li>
                </ul>
                <p>
                  Products may however not be delivered in case of
                  non-availability of above ID Proofs.
                </p>
              </li>
            </ol>
          </section>
          <div className={styles.lastUpdated}>
            <p>Last Updated: {new Date().getFullYear()}</p>
          </div>
        </article>
      </div>
    </>
  );
}

export default page
