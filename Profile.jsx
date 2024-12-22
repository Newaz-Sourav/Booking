import { useState, useEffect } from "react";

const Profile = () => {


  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    const storedTimeLeft = localStorage.getItem("timeLeft");
    const storedDisabledState = localStorage.getItem("isDisabled");

    if (storedTimeLeft && storedDisabledState === "true") {
      const remainingTime = parseInt(storedTimeLeft, 10) - Math.floor(Date.now() / 1000);
      if (remainingTime > 0) {
        setIsDisabled(true);
        setTimeLeft(remainingTime);
      } else {
        localStorage.removeItem("timeLeft");
        localStorage.removeItem("isDisabled");
      }
    }
  }, []);

  useEffect(() => {
    let timer;

    if (isDisabled && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTimeLeft = prev - 1;

          if (newTimeLeft <= 0) {
            setIsDisabled(false);
            localStorage.removeItem("timeLeft");
            localStorage.removeItem("isDisabled");
          } else {
            localStorage.setItem("timeLeft", Math.floor(Date.now() / 1000) + newTimeLeft);
          }

          return newTimeLeft;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isDisabled, timeLeft]);

  const handleClick = () => {
    setIsDisabled(true);
    const newTimeLeft = 1 * 60;
    setTimeLeft(newTimeLeft);


    localStorage.setItem("timeLeft", Math.floor(Date.now() / 1000) + newTimeLeft);
    localStorage.setItem("isDisabled", "true");


    setShowPopup(true);


    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };



  return (
    <div>

      <div class="bg-[white]">




        <nav class="w-[100%] flex justify-center items-center pb-[0.4%]">
          <div class="navbar  md:w-[65%] w-[85%]">
            <div class="navbar-start">
              <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                </div>
                <ul tabindex="0"
                  class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li><a>Home</a></li>
                  <li><a>Interviewers</a></li>
                  <li><a>Blogs</a></li>
                </ul>
              </div>
              <a class="w-[35%] cursor-pointer">
                <img src="images/logo.png" alt="" class=" w-[100%]" />
              </a>
            </div>
            <div class="navbar-center hidden lg:flex">
              <ul class="menu menu-horizontal px-1 text-[16px] font-[700] text-[#524d4d]">
                <li><a class="hover:text-[#5B4DB8] hover:bg-transparent">Home</a></li>
                <li><a class="hover:text-[#5B4DB8] hover:bg-transparent">Interviewers</a></li>
                <li><a class="hover:text-[#5B4DB8] hover:bg-transparent">Blogs</a></li>
              </ul>
            </div>
            <div class="navbar-end">
              <a
                class="btn mr-[1%] font-[700] min-h-[2.3rem] h-[2.3rem] bg-[#f5f3f3] text-[black] border-transparent hover:bg-[#ecfaf9] hover:border-transparent">Sign
                In</a>
              <button
                class="btn btn-active btn-primary bg-[#5B4DB8] hover:bg-[#5B4DB8] text-[white] font-[700] min-h-[2.3rem] h-[2.3rem]">Get
                started</button>
            </div>
          </div>
        </nav>


        <header class="w-[100%] flex flex-col justify-center items-center pb-[3%]">
          <div class="up w-[100%] h-[16rem] overflow-hidden">
            <img src="images/bg.jpeg" alt="" class="object-cover w-full h-full" />
          </div>

          <div class=" dwn  md:w-[65%] w-[85%] flex flex-row justify-between items-center">
            <div class="lft w-[19%] ">
              <div class="avatar mt-[-23%]">
                <div class=" border-[white] border-[6px] w-[96%] rounded-full ">
                  <img src="images/pic.jpg" class="w-[100%]" />
                </div>
              </div>
            </div>

            <div class="rgt  w-[80%] pt-[1%] flex md:flex-row flex-col justify-between">
              <div class="l ">
                <div class="u flex items-center w-[82%] ">
                  <h1 class="text-[34px] text-[black] font-[700] pr-[5%]">Abir Khan</h1>
                  <img src="images/flag.png" alt="" class="w-[26px] h-[17px] rounded-[5px]" />
                </div>

                <div class="d text-[black]">
                  <p class="text-[18px] font-[500] leading-[32px]">Senior Software Engineer <span
                    class="text-[#696868]">at</span> <span class="font-[700] text-[20px]">Growth
                      Garage</span> </p>
                  <div class="flex items-center">
                    <img src="icons/location.png" alt="" class="w-[16px] h-[16px] mr-[3%]" />
                    <p class="font-[600] leading-[30px]">Bangladesh</p>
                  </div>
                  <div class="flex items-center">
                    <img src="icons/clock.png" alt="" class="w-[15px] h-[15px] mr-[3%]" />
                    <p class="font-[500] text-[#555454] leading-[30px]">Active<span
                      class="font-[700] text-[black]"> a week ago</span></p>
                  </div>
                  <div class="flex items-center">
                    <img src="icons/response.png" alt="" class="w-[15px] h-[15px] leading-[30px] mr-[3%]" />
                    <p class="font-[600] text-[#555454]">Usually responds in<span
                      class="font-[700] text-[black]"> hour</span></p>
                  </div>
                </div>
              </div>

              <div class="flex justify-end ">
                <div
                  class="w-[55px] h-[42px] md:mr-[4%] mr-[1%] rounded-[5px] hover:shadow-xl bg-[#5B4DB8] text-[white] flex justify-center items-center">
                  <a href=""><i class="fa-regular fa-comment text-[17px]"></i></a>
                </div>
                <div class="w-[55px] h-[42px] rounded-[5px] shadow-md flex justify-center items-center">
                  <a href=""><i class="fa-regular fa-heart text-[18px]"></i></a>
                </div>
              </div>


            </div>
          </div>

        </header>


        <main class="w-[100%] flex justify-center items-center">
          <div class="container w-[65%] ">
            <div>
              <div class="title flex font-[600] text-[#3a3838] text-[17px]">
                <h1 class="mr-[2.5%]">Overview</h1>
                <h1>Reviews</h1>
              </div>
              <div class="flex w-full flex-col mt-[-1%]">
                <div class="divider"></div>
              </div>
            </div>

            <div class="flex justify-between">
              <div class="lf w-[47%]">
                <div class="f text-[black]">
                  <p class="font-[600] text-[17px] py-[1%]">5+ Years of Experience in Software Engineering</p>
                  <h1 class="font-[700] text-[22px] py-[2%] pt-[5%]">Background</h1>
                  <div
                    class=" text-[17px] font-[600] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                    <div class="flex justify-between leading-[4.5rem]">
                      <h1 class="pl-[20px]">Skills</h1>
                      <div class="pr-[25px] flex items-center">
                        <p
                          class="border-[1px] border-[#dc3545] bg-[#dc35451a] text-[#dc3545] text-[15px] rounded-[5px] p-[12px] leading-[16px]">
                          Full stack</p>
                      </div>
                    </div>
                    <div class="flex justify-between rounded-b-[8px] border-t-[1px] leading-[4.5rem]">
                      <h1 class="pl-[20px]">Fluent In</h1>
                      <div class="flex gap-[10px] items-center pr-[25px]">
                        <p
                          class="border-[1px] border-[#ddd9d9b4] text-[15px] rounded-[5px] p-[12px] leading-[16px]">
                          Bengali</p>
                        <p
                          class="border-[1px] border-[#ddd9d9b4] text-[15px] rounded-[5px] p-[12px] leading-[16px]">
                          English</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="s text-[black] pt-[8%]">
                  <h1 class="font-[700] text-[22px] pb-[2%]">Experiences</h1>
                  <div
                    class="text-[17px] font-[600] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                    <div class="flex p-[3%] pb-[6%]">
                      <div
                        class="w-[51px] mr-[20px] h-[45px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                        <i class="fa-solid fa-briefcase text-[20px] text-[#5B4DB8]"></i>
                      </div>
                      <div class="leading-[26px]">
                        <h1 class="text-[20px]">Software Engineer</h1>
                        <p class="text-[16px]">ShareTrip Ltd <span class="text-[14px] text-[#686767]">(21
                          Dec 2024 - 21 Dec 2024)</span></p>
                        <p class="text-[13px]">Played Key role in developing ShareTrip B2B Portal</p>
                      </div>
                    </div>
                    <div class="flex p-[3%] pb-[6%] border-t-[1px]">
                      <div
                        class="w-[51px] mr-[20px] h-[45px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                        <i class="fa-solid fa-briefcase text-[20px] text-[#5B4DB8]"></i>
                      </div>
                      <div class="leading-[25px]">
                        <h1 class="text-[20px]">Software Engineer</h1>
                        <p class="text-[16px]">Field Nation <span class="text-[14px] text-[#686767]">(21 Dec
                          2024 - 21 Dec 2024)</span></p>
                        <p class="text-[13px]">Platform Operations Team</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="t text-[black] pt-[8%]">
                  <h1 class="font-[700] text-[22px] pb-[2%]">Educations</h1>
                  <div class=" text-[17px] font-[600]">
                    <div
                      class="flex p-[3%] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                      <div
                        class="w-[55px] mr-[18px] h-[50px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                        <i class="fa-solid fa-graduation-cap text-[19px] text-[#5B4DB8]"></i>
                      </div>
                      <div>
                        <h1 class="text-[20px]">International Islamic University Chittagong</h1>
                        <p class="text-[13px] text-[#686767]">Bachelors of Computer Science and Engineering
                          • 2024 • 2024</p>
                      </div>
                    </div>
                    <div
                      class="flex mt-[3%] p-[3%] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                      <div
                        class="w-[55px] mr-[18px] h-[50px] bg-[#bebebe1a] rounded-[5px] flex justify-center items-center">
                        <i class="fa-solid fa-graduation-cap text-[19px] text-[#5B4DB8]"></i>
                      </div>
                      <div>
                        <h1 class="text-[20px]">International Islamic University Chittagong</h1>
                        <p class="text-[13px] text-[#686767]">Masters in CS in Data Science Track • 2024 •
                          2024

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="rt w-[47%] text-[black] pt-[1%]">
                <div class="p-[4%] border-[#ddd9d9b4] border-[1px] rounded-[8px] shadow-[0px_2px_12px_#ddd9d9]">
                  <div>
                    <h1 class="font-[700] text-[22px]">Community statistics</h1>
                    <div class="grid grid-cols-2 py-[5%] gap-x-[10%]">
                      <div class="flex mb-[14%]">
                        <div
                          class="mr-[6%] flex justify-center items-center bg-[#dc35451a] text-[#dc3545] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[20px]">
                          <i class="fa-regular fa-rectangle-list"></i>
                        </div>
                        <div>
                          <h1 class="text-[20px] font-[600]">0</h1>
                          <p class="text-[#6c757d] font-[500]">Completed Sessions</p>
                        </div>
                      </div>
                      <div class="flex mb-[14%]">
                        <div
                          class="mr-[6%] flex justify-center items-center bg-[#28a74533] text-[#28a745] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[22px]">
                          <i class="fa-regular fa-clock"></i>
                        </div>
                        <div>
                          <h1 class="text-[20px] font-[600]">0 Minutes</h1>
                          <p class="text-[#6c757d] font-[500]">Total mentoring time</p>
                        </div>
                      </div>
                      <div class="flex">
                        <div
                          class="mr-[6%] flex justify-center items-center bg-[#99c2f433] text-[#286efb] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[20px]">
                          <i class="fa-regular fa-calendar-check"></i>
                        </div>
                        <div>
                          <h1 class="text-[20px] font-[600]">3%</h1>
                          <p class="text-[#6c757d] font-[500]">Average Attendence</p>
                        </div>
                      </div>
                      <div class="flex">
                        <div
                          class="mr-[6%] flex justify-center items-center bg-[#ffc1071a] text-[#856404] w-[55px] h-[30px] p-[26px] rounded-[10px] text-[20px]">
                          <i class="fa-solid fa-graduation-cap text-[19px]"></i>
                        </div>
                        <div>
                          <h1 class="text-[20px] font-[600]">5 Years</h1>
                          <p class="text-[#6c757d] font-[500]">Experience</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 class="font-[700] text-[22px] py-[3%] pt-[4%]">Sessions</h1>
                    <div
                      class="flex justify-between items-center mb-[5%] px-[3%] py-[2%] border-[#ddd9d9b4] hover:border-[#5B4DB8] border-[2px] rounded-[5px]">
                      <div>
                        <p class="font-[600]">Full Stack Developer Mock Interview</p>
                        <div class="flex items-center text-[#686767] text-[13px] pt-[1%]">
                          <i class="fa-regular fa-clock"></i>
                          <p class="font-[600] pl-[4px]">{formatTime(timeLeft)} minitues</p>
                        </div>
                      </div>
                      <div class="w-[18%] bg-[#6a747b1a] rounded-[35px] flex justify-center items-center">
                        <div class="font-[600]">
                          <h1 class="leading-[34px] text-[17px]">450.00 ৳</h1>
                        </div>
                      </div>
                    </div>
                    <div class="w-[100%] flex justify-center items-center pb-[2%]">


                      <button

                        onClick={handleClick}
                        disabled={isDisabled}

                        className={`px-4 py-2 text-white ${isDisabled ? "btn-block w-[100%] bg-green-400 hover:bg-[#5B4DB8] text-[16px] rounded-[5px] text-[red] border-transparent cursor-not-allowed" : "btn btn-block w-[100%] bg-[#5B4DB8] hover:bg-[#5B4DB8] text-[16px] rounded-[5px] text-[white] border-transparent"
                          } rounded`}>

                        {isDisabled ? "Please wait..." : "Book Now"}
                      </button>


                    </div>

                    <div>
                      {/* Pop-Up */}
                      {showPopup && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-50">
                          <p className="text-green-600 font-bold text-center">Booking Confirmed!</p>
                        </div>
                      )}
                    </div>


                  </div>

                </div>
              </div>
            </div>
          </div>

        </main>


        <footer class="pt-[2%] w-[100%] flex flex-col justify-center items-center">
          <div class="flex w-full flex-col">
            <div class="divider"></div>
          </div>

          <div class="w-[65%]">
            <footer class="footer text-[black] p-10">
              <aside>
                <img src="Images/logo.png" alt="" class="w-[9rem]" />
                <p class="font-[600] text-[17px] pt-[3%]">
                  Empowering your journey, one Mock Interview at a time.
                </p>
              </aside>
              <nav class="text-[#757474] font-[700]">
                <h6 class="text-[17px] text-[black] pb-[18%]">Services</h6>
                <a class="link link-hover hover:text-[#5B4DB8]">Interviewers</a>
                <a class="link link-hover hover:text-[#5B4DB8]">Blogs</a>
                <a class="link link-hover hover:text-[#5B4DB8]">Contact</a>
              </nav>
              <nav class="text-[#757474] font-[700]">
                <h6 class="text-[17px] text-[black] pb-[12%]">Pages</h6>
                <a class="link link-hover hover:text-[#5B4DB8]">Terms and Condition</a>
                <a class="link link-hover hover:text-[#5B4DB8]">Privacy Policy</a>
              </nav>
            </footer>
          </div>

          <div class="flex w-full flex-col">
            <div class="divider"></div>
          </div>

          <footer class="footer footer-center text-base-content pb-[1.5%]">
            <aside>
              <p class="text-[16px] text-[black] font-[600]">© 2024 All rights reserved.</p>
            </aside>
          </footer>

        </footer>





      </div>
    </div>

  )
}

export default Profile;