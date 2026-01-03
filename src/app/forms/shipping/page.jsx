"use client";
import styles from "./page.module.css";
import clsx from "clsx";

const Page = () => {
  return (
    <div className={styles.shippingCtn}>
      <div className={styles.headerCtn}>
        <div className={styles.stepLabelCtn}>
          <div className={styles.iconCtn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.stepIcon}
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <span className={styles.stepTitle}>Your Cart</span>
        </div>
        <button className={styles.closeBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.icon}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <form className={styles.contentForm}>
        {/* Full Name */}
        <div className={clsx(styles.gridRowSingle, styles.row1)}>
          <label htmlFor="fullName" className={styles.label}>
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className={styles.input}
          />
        </div>

        {/* Email & Phone */}
        <div className={clsx(styles.gridRowDual, styles.row2)}>
          <div className={clsx(styles.subColumn, styles.email)}>
            <label htmlFor="email" className={styles.label}>
              Email address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className={styles.input}
            />
          </div>

          <div className={clsx(styles.subColumn, styles.phoneNumber)}>
            <label htmlFor="phone" className={styles.label}>
              Phone number *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              className={styles.input}
            />
          </div>
        </div>

        {/* Address */}
        <div className={clsx(styles.gridRowSingle, styles.row3)}>
          <label htmlFor="address" className={styles.label}>
            Address (House no, Street, Area) *
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            className={styles.input}
          />
        </div>

        {/* City & State */}
        <div className={clsx(styles.gridRowTriple, styles.row4)}>
          <div className={clsx(styles.subColumn, styles.city)}>
            <label htmlFor="city" className={styles.label}>
              City *
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Enter your city"
              className={styles.input}
            />
          </div>

          <div className={clsx(styles.subColumn, styles.stateDropdown)}>
            <label htmlFor="state" className={styles.label}>
              State *
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="state"
                name="state"
                defaultValue=""
                required
                className={styles.input}
              >
                <option value="" disabled hidden>
                  Select State
                </option>

                {/* States */}
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CT">Chhattisgarh</option>
                <option value="GA">Goa</option>
                <option value="GJ">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="UK">Uttarakhand</option>
                <option value="WB">West Bengal</option>

                {/* Union Territories */}
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="CH">Chandigarh</option>
                <option value="DN">
                  Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="DL">Delhi</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="LA">Ladakh</option>
                <option value="LD">Lakshadweep</option>
                <option value="PY">Puducherry</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>

          <div className={clsx(styles.subColumn, styles.pincode)}>
            <label htmlFor="pincode" className={styles.label}>
              Pincode *
            </label>
            <input
              id="pincode"
              name="pincode"
              type="number"
              placeholder="Enter your pincode"
              className={styles.input}
            />
          </div>
        </div>

        {/* Pincode */}
        <div className={clsx(styles.shippingRow, styles.row5)}>
          <div className={styles.shippingTitle}>Shipping Method</div>
          <label className={styles.radioCtn}>
            <div className={styles.leftCtn}>
              {/* REAL RADIO (hidden) */}
              <input
                type="radio"
                name="shipping"
                value="free"
                required
                className={styles.inputRadio}
              />

              {/* CUSTOM RADIO */}
              <span className={styles.customRadio} />
              <div className={styles.textCtn}>
                <span className={styles.optionLabel}>Free Shipping</span>
                <span className={styles.shippingTime}>| 7-20 Days</span>
              </div>
            </div>
            <span className={styles.shippingPrice}>₹0</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Page;
