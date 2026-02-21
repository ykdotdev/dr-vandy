"use client"
import BackBtn from '@/components/BackBtn'
import styles from './page.module.css'

const page = () => {
  return (
    <>
      <BackBtn />
      <div className={styles.mainContainer}>
        <article className={styles.content}>
          <h1 className={styles.h1}>Return Policy</h1>
          <section className={styles.section}>
            <ol>
              <li>
                <p>
                  Dr. Vandy’s Lab (“We”, “Our” or “Us”) strive to provide our
                  customers with superior quality products and excellent personal
                  service. We are always available to address any special requests
                  or concerns as effectively and efficiently as we possibly can.
                  We look forward to servicing our new and loyal clients.
                </p>
              </li>
              <li>
                <h2>RETURN & EXCHANGE</h2>
                <p>
                  In case you receive a different product from your original order
                  or a defective/damaged product please write to us at
                  info@drvandys.com with an image of the incorrect/damaged item
                  along with your order number, within 12 hours of receiving the
                  product.
                </p>
              </li>
              <li>
                <p>
                  To be eligible for a return or exchange, your item must be
                  unused and returned to us within 5 working days from the date of
                  the delivery in the same condition and packaging that you
                  received it. The shipping cost of the return would need to be
                  borne by you and we will bear the shipping cost of the
                  replacement item being sent to you.
                </p>
              </li>
              <li>
                <p>
                  Returned item with an approval or rejection of your request
                  based on the condition of Once your return is received and
                  inspected, we will send you an email to notify you that we have
                  received your the product. If your request is approved, then
                  your exchange or return will be processed.
                </p>
              </li>
              <li>
                <p>
                  In case of exchange the goods are replaced in the same style,
                  subject to availability of inventory. In the unlikely event we
                  are unable to for some reason provide you with a replacement
                  piece, we would refund the amount.
                </p>
              </li>
              <li>
                <h2>REFUND</h2>
                <p>
                  All refunds will be transferred or paid back in the original
                  payment method.
                </p>
              </li>
              <li>
                <h2> TAXES & DUTIES</h2>
                <p>
                  As per Indian taxes, the product prices are inclusive of GST.
                  Upon checkout if you wish to generate a business tax invoice,
                  please add your GST number under "Order Notes".
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
