import NoRecord from "../../Components/ReUse/NoRecord";
import axios from "axios";
import LoaderForApi from "../../Components/ReUse/LoaderForApi";
import LoaderForContent from "../../Components/ReUse/LoaderForContent";

class ReUse {
  static emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  static defaultAvatar = ({ username = "John Doe" }) => {
    try {
      return `https://ui-avatars.com/api/?name=${username}&background=random&size=512`;
    } catch (err) {
      return "";
    }
  };

  static defaultThumbnailImage = ({ content = "No+Image+Available" }) => {
    try {
      return `https://placehold.co/400x400?text=${content}`;
    } catch (err) {
      return "";
    }
  };

  static resetForm = ({ fields = {} }) => {
    /**
     *  // fields is object
     *
     * Like fields = {
     * name: string
     * .....
     * }
     */

    const reset = Object.entries(fields).forEach(([key, value]) => {
      fields[key] = "";
    });
    return reset;
  };

  static resetErrors = ({ fields = {} }) => {
    /**
     *  // fields is object
     *
     * Like fields = {
     * name: string
     * .....
     * }
     */
    const reset = Object.entries(fields).forEach(([key, value]) => {
      fields[key] = "";
    });
    return reset;
  };

  static mapItems = (
    loading,
    data = [],
    Component,
    extraData,
    ...attributes
  ) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters?.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (Array.isArray(data) && data.length > 0) {
        return data.map((item, i) => (
          <Component
            key={generateId()}
            {...item}
            currentIndex={i}
            extraData={extraData}
          />
        ));
      }

      return <NoRecord />;
    } catch (error) {
      return <NoRecord />;
    }
  };

  static mapArray = (loading, data = [], Component, ...attributes) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters?.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (Array.isArray(data) && data.length > 0) {
        return data.map((item, i) => (
          <Component
            key={generateId()}
            {...attributes.reduce(
              (acc, attr) => ({ ...acc, [attr]: item }),
              {}
            )}
          />
        ));
      }

      return <NoRecord />;
    } catch (error) {
      return <NoRecord />;
    }
  };

  static loadObjBasedApiData = ({ loading, data = "" }) => {
    if (loading) {
      return <LoaderForContent />;
    }
    if (typeof data === "string" || data instanceof String) {
      return data || "";
    }
    return "";
  };

  static onImageError = (e) => {
    const content = "No+Image+Available";
    const { target } = e ?? {};
    try {
      target.src = `https://placehold.co/200x200?text=${content}`;
    } catch (error) {
      target.src = "";
    }
  };

  static removeHTMLTags = ({ unStripped = "" }) => {
    if (typeof unStripped === "string" || unStripped instanceof String) {
      let stripped = unStripped?.replaceAll(/<\/?[^>]+(>|$)/gi, "");
      return stripped;
    }

    return unStripped;
  };

  static validateRequired = ({ fields }) => {
    /**
     *
     * fields is object
     * example
     * 		const fields = {
     * 				email: "",
     * 				password: "",
     * 				// Add more fields as needed
     * 				};
     */

    const errors = {};

    for (const field in fields) {
      if (!fields[field]) {
        errors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (field?.toLowerCase() === "email") {
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegExp.test(fields[field])) {
          errors[field] = "Please enter a valid email";
        }
      } else if (field?.toLowerCase() === "password") {
        if (fields[field].length < 6) {
          errors[field] = "Password must be at least 6 characters long";
        }
      } else if (
        field?.toLowerCase() === "phone" ||
        field?.toLowerCase() === "cellphone" ||
        field?.toLowerCase() === "cell_phone"
      ) {
        if (fields[field]?.length < 11) {
          errors[field] = "Phone number must be at least 11 digits long";
        }
        const phoneRegExp =
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        // (123) 456-7890
        // (123)456-7890
        // 123-456-7890
        // 123.456.7890
        // 1234567890
        // +31636363634
        // 075-63546725
        if (!phoneRegExp.test(fields[field])) {
          errors[field] = "Please enter a valid number";
        }
      }
    }

    return errors;
  };

  static scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  static handleFileUploads = (e) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        const file = e.target.files[0];

        if (!file) {
          reject(new Error("No file selected."));
          return;
        }

        reader.onload = () => {
          const fileOutput = file;
          const fileUpload = reader.result;
          resolve({ fileOutput, fileUpload });
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  static handleMultipleImagesUpload = ({ e, prevImages }) => {
    return new Promise((resolve, reject) => {
      try {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files).map((file) =>
            URL.createObjectURL(file)
          );
          resolve([...prevImages, ...filesArray]);
          Array.from(e.target.files).forEach(
            (file) => URL.revokeObjectURL(file) // avoid memory leak
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static dateFormat = ({ date = "" }) => {
    try {
      if (!date) {
        return "Invalid Date";
      }

      if (typeof date === "string" || date instanceof String) {
        return "Invalid Date";
      }

      const formatedDate = new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return formatedDate;
    } catch (error) {
      return "Invalid Date";
    }
  };

  static logOutUser = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  static getApiData = async (
    apiFunction,
    setApiData,
    setLoading,
    ...params
  ) => {
    setLoading(true);
    try {
      let apiResp = await apiFunction;
      const { status, data } = apiResp || {};
      const result = status === 200 ? data?.data?.reverse() : [];
      setApiData(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  static sortData = ({ data = [], order, sortByProperty }) => {
    /**
     * data should be array of objects
     * order =1 ( for ascending)
     * order =2 ( for descending)
     * sortByProperty = property ( add property on the basis you want to sort data)
     *
     */

    if (!Array.isArray(data)) {
      return data;
    }

    if (![1, 2].includes(order)) {
      return data;
    }

    if (!sortByProperty || typeof sortByProperty !== "string") {
      return data;
    }

    const compareFunction = (a, b) => {
      const valA = a[sortByProperty];
      const valB = b[sortByProperty];

      if (valA === valB) {
        return 0;
      }

      if (order === 1) {
        return valA < valB ? -1 : 1;
      } else {
        return valA > valB ? -1 : 1;
      }
    };

    return [...data].sort(compareFunction);
  };

  static sliceText = ({ content = "", noOfWords = 3 }) => {
    if (typeof content === "string" || content instanceof String) {
      const words = content && content?.trim()?.split(/\s+/);
      return words?.slice(0, noOfWords)?.join(" ");
    }
    return content;
  };

  static convertDollarToCents = ({ dollars = 0 }) => {
    var cents = dollars * 100;
    return cents;
  };

  static getInputFieldsData = ({ e, setFieldsData, fieldsData }) => {
    try {
      const { value, name } = e.target;

      if (!name || typeof value === "undefined") {
        setFieldsData({});
      }

      const updatedFieldsData = {
        ...fieldsData,
        [name]: value,
      };

      setFieldsData(updatedFieldsData);
    } catch (error) {
      console.error("Error updating fields data:", error);
      setFieldsData({});
    }
  };

  static stripePaymentHandler = async ({
    fieldsData = {},
    stripePublishableKey = "",
  }) => {
    const { cardNumber, expiryDate, cvcNumber } = fieldsData;

    if (!cardNumber || !expiryDate || !cvcNumber) {
      return { isPaymentSuccess: false, data: {} };
    }

    const cardToken = {
      card: {
        number: cardNumber,
        exp_month: expiryDate.split("/")[0],
        exp_year: expiryDate.split("/")[1],
        cvc: cvcNumber,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_STRIPE_BASE_URL}/tokens`,
        cardToken,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${stripePublishableKey}`,
          },
        }
      );

      return { isPaymentSuccess: true, data: response.data };
    } catch (err) {
      console.error("Stripe Payment Error:", err.message);
      return { isPaymentSuccess: false, data: {} };
    }
  };

  static isValidCardNumber = ({ cardNumber }) => {
    // Remove any non-numeric characters from the card number
    const cleanedCardNumber = cardNumber.replace(/\D/g, "");

    if (!cleanedCardNumber || cleanedCardNumber.length !== 16) {
      return false; // Card number must be exactly 16 digits long
    }

    // Convert the card number to an array of digits
    const digits = cleanedCardNumber?.split("").map(Number);

    // Double every other digit starting from the second-to-last digit
    for (let i = digits.length - 2; i >= 0; i -= 2) {
      digits[i] *= 2;
      if (digits[i] > 9) {
        digits[i] -= 9; // If the result is greater than 9, subtract 9
      }
    }

    // Sum all the digits
    const sum = digits.reduce((acc, curr) => acc + curr, 0);

    // If the sum is divisible by 10, the card number is valid
    return sum % 10 === 0;
  };

  static isValidExpiryDate = ({ expiryDate }) => {
    const currentDate = new Date();
    const [expMonth, expYear] = expiryDate.split("/");
    const expirationDate = new Date(
      Number(`20${expYear}`),
      Number(expMonth) - 1
    );

    if (
      isNaN(expMonth) ||
      isNaN(expYear) ||
      expMonth.length !== 2 ||
      expYear.length !== 2
    ) {
      return false; // Invalid format
    }

    // Check if the expiration date is not in the past
    return expirationDate >= currentDate;
  };

  static isValidCVCNumber = ({ cvcNumber }) => {
    const cleanedCvcNumber = cvcNumber.replace(/\D/g, ""); // Remove any non-numeric characters

    return cleanedCvcNumber.length === 3; // CVC number must be exactly 3 digits long
  };

  static extractIdFromCurrentUrl() {
    try {
      let currentUrl = window?.location?.href || "";
      const urlParts = currentUrl?.split("/");
      const id = urlParts[urlParts?.length - 1];

      if (!id) {
        return null;
      }

      return id;
    } catch (error) {
      console.error("Error extracting ID from URL:", error.message);
      return null;
    }
  }

  static isValueEmpty({ object = {} }) {
    let isValueEmpty = false;

    Object.entries(object).forEach(([key, value]) =>
      object[key] === "" ? (isValueEmpty = false) : (isValueEmpty = true)
    );

    return isValueEmpty;
  }

  static removeSpecialCharacterFromString({
    stringInput = "",
    characterToMatch = "",
  }) {
    const regExp = new RegExp(characterToMatch, "g");

    const stringWithoutSpecialCharacter = stringInput?.replace(regExp, "");

    return stringWithoutSpecialCharacter;
  }

  static isValidColor({ stringInput = "" }) {
    if (typeof stringInput !== "string") {
      return false;
    }

    // Regular expression to match valid hexadecimal color codes
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    if (!colorRegex.test(stringInput)) {
      return false;
    }

    return true;
  }

  static isFound({ data = [], target = null || "" }) {
    return data.some(function (record) {
      return record.product_id === target;
    });
  }

  static calculateSubtotalPrice = ({ unitPrice = 0, quantity = 0 }) => {
    return quantity > 0 ? quantity * unitPrice : unitPrice;
  };

  static calculateTotalSubtotalPrice = ({ data = [] }) => {
    const subtotal = data.reduce((total, item) => {
      const quantity = item.qty || 1;
      return total + item.unit_price * quantity;
    }, 0);

    return subtotal;
  };

  static calculateTotalCost = ({ data = [], shippingCost = 0 }) => {
    const subtotal = data.reduce((total, item) => {
      const itemTotal =
        item.qty > 0 ? item.unit_price * item.qty : item.unit_price;
      return total + itemTotal;
    }, 0);

    const totalCost = subtotal + shippingCost;
    return totalCost;
  };

  static calculateTotalShipping = ({ data = [] }) => {
    const extractShippingCosts = data.map(
      ({ shippingCharges }) => shippingCharges || 0
    );
    const totalShippingCost = extractShippingCosts.reduce((a, b) => a + b, 0);
    return totalShippingCost;
  };

  static getStringProperties = ({ object = {} }) => {
    const result = {};

    for (let key in object) {
      if (typeof object[key] === "string") {
        result[key] = object[key];
      }
    }

    return result;
  };

  static mapObject = ({ loading, data = {}, Component, extraData }) => {
    function generateId(length = 9) {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters?.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result || "12ABCD";
    }

    try {
      if (loading) {
        return <LoaderForApi />;
      }

      if (
        typeof data === "object" &&
        data !== null &&
        Object.keys(data).length > 0
      ) {
        return Object.keys(data).map(function (keyName, keyIndex) {
          return (
            <Component
              key={generateId()}
              {...data[keyName]}
              keyName={keyName}
              objectData={data}
              extraData={extraData}
              currentIndex={keyIndex}
            />
          );
        });
      }

      return <NoRecord />;
    } catch (error) {
      return <NoRecord />;
    }
  };

  static minifyArrayOfObjects = ({ data = [], key = "name" }) => {
    try {
      if (
        !Array.isArray(data) ||
        data.some((item) => typeof item !== "object")
      ) {
        return [];
      }

      const arrayUniqueByKey = [
        ...new Map(data?.map((item) => [item[key], item])).values(),
      ];

      const minifiedResult = arrayUniqueByKey?.map(
        ({ id: value, [key]: label }) => {
          return {
            value,
            label,
          };
        }
      );

      return minifiedResult;
    } catch (error) {
      return [];
    }
  };

  static foundRecord = ({ data = [], property, target }) => {
    const foundedRecord = data.find((record) => record[property] === target);
    return foundedRecord || {};
  };

  static filteredObj = ({ objectInput = {}, filteredKeys = [] }) => {
    const filteredObj = Object.keys(objectInput).reduce((acc, key) => {
      if (!filteredKeys.includes(key)) {
        acc[key] = objectInput[key];
      }
      return acc;
    }, {});

    return filteredObj;
  };

  static isArrayHasIndex = ({ arrayInput = [], index = 0 }) => {
    if (!Array.isArray(arrayInput)) {
      return false;
    }

    return arrayInput.length > index;
  };

  static isNumberOrText = ({ stringInput = "" }) => {
    return /^\d+(\.\d+)?$/.test(stringInput);
  };

  static addHyphenIfSpace = ({ word = "" }) => {
    if (word?.includes(" ")) {
      return word?.replace(/\s+/g, "-"); // Replace one or more spaces with a hyphen
    } else {
      return word?.trim(); // Remove leading and trailing spaces if there is only one word
    }
  };

  static extractDataByProperty = ({ data = [], propertyName = "" }) => {
    const extractedData = data?.map((item) => item[propertyName]);
    return extractedData || [];
  };

  static makeId = (length = 9) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters?.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result || "12ABCD";
  };

  static isFile = ({ file = {} }) => {
    return Object.keys(file)?.length > 0;
  };

  static generateId(length = 4) {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}

export default ReUse;
