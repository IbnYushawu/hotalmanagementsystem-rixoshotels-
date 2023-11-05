import toast from "react-hot-toast";
import { CubeSpinner } from "react-spinners-kit";
import { Type } from "react-bootstrap-icons";
import { format, differenceInMinutes, isBefore, isEqual } from "date-fns";

export function FormatDate(inputDate) {
  const date = new Date(inputDate);
  const formattedDate = format(date, "EE LLL dd yyyy");

  return formattedDate;
}

export function loaderAnim(div) {
  const container = document.querySelectorAll(`.${div}`);
  if (container) {
    container.forEach((element) => {
      setInterval(() => {
        element.classList.add("anim_div");
      }, 2000);
    });
  }

  container.forEach((child, index) => {
    const prevSibling = child.previousElementSibling;

    if (index === 0 && child.getBoundingClientRect().top < window.innerHeight) {
      child.classList.add("anim_div");
    }

    if (
      index > 0 &&
      prevSibling &&
      prevSibling.classList.contains("anim_div")
    ) {
      setTimeout(() => {
        if (child) {
          child.classList.add("anim_div");
        }
      }, 500);
    }
  });
}

export function searchIfFound(cards_data, reported) {
  let filteredList = [];

  if (reported) {
    const report_firstname = reported.firstname;
    const report_lastname = reported.lastname;

    const report_id = reported.id_number;
    if (cards_data && cards_data.length > 0) {
      cards_data.forEach((allcards) => {
        const p_firstname = allcards.firstname;
        const p_lastname = allcards.lastname;
        const p_middlename = allcards.middlename;
        const p_id = allcards.id_number;

        if (
          p_firstname.toLowerCase() === report_firstname.toLowerCase() &&
          p_lastname.toLowerCase() === report_lastname.toLowerCase()
        ) {
          filteredList.push(allcards);
        } else if (p_id.toLowerCase() === report_id.toLowerCase()) {
          filteredList.push(allcards);
        }
      });
    }
  }

  return { length: filteredList.length, data: filteredList };
}

export const PromptToastify = (message) => {
  toast.success(message, {
    duration: 7000,
    position: "top-center",

    // Styling
    style: {},
    className: "",

    // Custom Icon
    icon: "💬",
  });
};

export const showToastify = (type, message) => {
  switch (type) {
    case "SUCCESS":
      toast.success(message, {
        duration: 5000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "✔️",
      });
      break;
    case "ERROR":
      toast.error(message, {
        duration: 4000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "❌",
      });
      break;
    default:
      return null;
  }
};
export const shownewEmployeeP = (target, div) => {
  const showdiv = document.querySelector(`.${div}`);
  showdiv.classList.add("emploee_add_show");
  setTimeout(() => {
    showdiv.scrollIntoView({
      behavior: "smooth",
    });
  }, 500);
};
export const hideEmployeeP = (target, div) => {
  const showdiv = document.querySelector(`.${div}`);
  showdiv.classList.remove("emploee_add_show");
  setTimeout(() => {
    window.scrollTo(0,0)
  }, 500);
};

export const CheckTopAds = (ads) => {
  const div = document.querySelectorAll(".categorytem");
  const profile_container = document.querySelectorAll(".profile_layout");
  if (!ads) {
    div.forEach((item) => {
      if (item) {
        item.classList.add("categorytem_margin");
      }
    });
    profile_container.forEach((item) => {
      if (item) {
        item.classList.add("addTopmarginprofile");
      }
    });
  } else {
    div.forEach((item) => {
      if (item) {
        item.classList.remove("categorytem_margin");
      }
    });
    profile_container.forEach((item) => {
      if (item) {
        item.classList.remove("addTopmarginprofile");
      }
    });
  }
};

export const CheckHover = () => {
  const topcatlayout = document.querySelectorAll(".topcatlayout");
  const catebtn = document.querySelectorAll(".catebtn");
  topcatlayout.forEach((item) => {
    if (item) {
      item.addEventListener("mouseover", (e) => {
        item.firstChild.classList.add("showTopcat");
        item.firstChild.firstChild.classList.remove("topcat_panim");
        item.firstChild.firstChild.classList.add("topcat_p");
      });
      item.addEventListener("mouseout", (e) => {
        item.firstChild.classList.remove("showTopcat");
        item.firstChild.firstChild.classList.remove("topcat_p");
        item.firstChild.firstChild.classList.add("topcat_panim");
      });
    }
  });
};

export const CheckTopp = () => {
  const div = document.querySelectorAll(".categorytem");
  const profile_container = document.querySelectorAll(".profile_layout");

  div.forEach((item) => {
    if (item) {
      if (item.classList.contains("categorytem")) {
        item.classList.add("categorytem_margin");
        item.classList.remove("categorytem");
      }
    }
  });
  profile_container.forEach((item) => {
    if (item) {
      if (!item.classList.contains("addTopmarginprofile")) {
        item.classList.add("addTopmarginprofile");
      }
    }
  });
};

export function saveEditorContent(convertToRaw, editorState) {
  const contentState = convertToRaw(editorState.getCurrentContent());
  const contentString = JSON.stringify(contentState);
  return contentString;
}

export function Mtime(dateString) {
  const inputDate = new Date(dateString);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
  const month = monthsOfYear[inputDate.getUTCMonth()];
  const day = inputDate.getUTCDate();
  const hours = inputDate.getUTCHours();
  const minutes = inputDate.getUTCMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  const formattedDate = `${dayOfWeek} ${month} ${day} ${formattedHours}:${minutes}${ampm}`;
  return formattedDate;
}

// Disable scrolling
export function disableScroll() {
  // Save the current scroll position
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  // Add styles to make the page fixed at the current scroll position
  document.body.style.position = "fixed";
}

// Enable scrolling
export function enableScroll() {
  // Get the previous scroll position from the style attribute
  var scrollPosition = parseInt(document.body.style.top, 10);
  // Remove the fixed positioning and restore the scroll position
  document.body.style.position = "";
  document.body.style.top = "";

  // Scroll back to the original position
  window.scrollTo(0, scrollPosition);
}

export function stayDays(startDate, endDate) {
  // Create Date objects for the two dates
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  // Calculate the time difference in milliseconds
  const timeDifference = date2.getTime() - date1.getTime();

  // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export const showCoursesm = () => {
  const containerv = document.querySelectorAll(".layoutspacv");

  containerv.forEach((child, index) => {
    const prevSibling = child.previousElementSibling;

    if (index > 0 && prevSibling) {
      setInterval(() => {
        if (prevSibling.classList.contains("showspac")) {
          if (child.getBoundingClientRect().top < window.innerHeight) {
            if (!child.classList.contains("showspac")) {
              child.classList.add("showspac");
            }
          }
        }
      }, 500);
    } else {
      if (child.getBoundingClientRect().top < window.innerHeight) {
        if (!child.classList.contains("showspac")) {
          child.classList.add("showspac");
        }
      }
    }
  });

  window.addEventListener("scroll", () => {
    containerv.forEach((child, index) => {
      const prevSibling = child.previousElementSibling;

      if (index > 0 && prevSibling) {
        setInterval(() => {
          if (prevSibling.classList.contains("showspac")) {
            if (child.getBoundingClientRect().top < window.innerHeight) {
              if (!child.classList.contains("showspac")) {
                child.classList.add("showspac");
              }
            }
          }
        }, 500);
      } else {
        if (child.getBoundingClientRect().top < window.innerHeight) {
          if (!child.classList.contains("showspac")) {
            child.classList.add("showspac");
          }
        }
      }
    });
  });
};

export const DueTime = (date) => {
  var currentDate = date;
  // Add one hour
  currentDate.setHours(currentDate.getHours() + 1);
  return currentDate;
};

export const defaultDueTime = () => {
  var currentDate = new Date();

  // Add one hour
  currentDate.setHours(currentDate.getHours() + 1);
  return currentDate;
};

export function differenceBetween(startTime, endTime, price, options) {
  const startDate = new Date();
  const endDate = new Date();

  startDate.setHours(startTime.split(":")[0]);
  startDate.setMinutes(startTime.split(":")[1]);

  endDate.setHours(endTime.split(":")[0]);
  endDate.setMinutes(endTime.split(":")[1]);

  const duration = differenceInMinutes(endDate, startDate);
  const formatedPrice =
    parseFloat(((price * duration) / 60).toFixed(0)) + options * 20;
  return formatedPrice;
}

export function checkDueDate(targetDate) {
  const yourDate = new Date(targetDate);
  const currentDate = new Date();

  if (isBefore(yourDate, currentDate) || isEqual(yourDate, currentDate)) {
    return true;
  } else {
    return false;
  }
}
export function ReturnOrderByType(target, data) {
  const filterD = data.filter(
    (data) => data.room.room_type.charAt(0) === target.charAt(0)
  );

 
  return filterD;
}
