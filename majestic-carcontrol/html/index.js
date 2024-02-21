resourceName = null;
deathScreenOpen = false;
const isOdd = number => number % 2 !== 0;
vehData = [];
vehData.windows = [];
vehData.lightsData = [];
vehData.doorData = [];
alignData = {
    ["top-left"]: {left: 0, top: 6},
    ["top-right"]: {right: 0, top: 6},
    ["top-center"]: {right: 0, left: 0, top: 3},
    ["bottom-left"]: {left: 0, bottom: 6},
    ["bottom-right"]: {right: 0, bottom: 6},
    ["bottom-center"]: {right: 0, left: 0, bottom: 3}
};
window.addEventListener('message', function(event) {
    ed = event.data;
	if (ed.action === "openCarMenu") {
		if (ed.state === true) {
            var sheets = document.getElementsByTagName('link'); 
            sheets[0].href = ed.styleType + ".css"; 
            if (alignData[ed.align]) {
                if (alignData[ed.align].left) {
                } else {
                    document.getElementById("mainDiv").style.left = alignData[ed.align].left + "%";
                }
                if (alignData[ed.align].right === null) {
                } else {
                    document.getElementById("mainDiv").style.right = alignData[ed.align].right + "%";
                }
                if (alignData[ed.align].top) {
                    document.getElementById("mainDiv").style.top = alignData[ed.align].top + "%";
                }
                if (alignData[ed.align].bottom) {
                    document.getElementById("mainDiv").style.bottom = alignData[ed.align].bottom + "%";
                }
            }
			resourceName = ed.resourceName;
			carMenuOpen = true;
            document.getElementById("mainDiv").style.display = "flex";
            vehData.alarmState = false;
            // Windows
            document.getElementById("MDDBottomDivWindows").innerHTML="";
            for (i = 1; i < ed.carData.doorNum + 1; i++) {
                vehData.windows[i] = false;
                if (isOdd(i) === true) {
                    var windowsHTML = `
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivWindow-${i}" onclick="clFunc('window', '${i}')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivWindow-${i}"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style="position: relative;">
                            <path d="M31.5924 3H22.1146C22.0413 3 21.9679 3.02038 21.9068 3.05707L0.199745 15.9997C0.0754139 16.0731 0 16.2076 0 16.3503V29.3949C0 29.6191 0.18344 29.8025 0.407643 29.8025H31.5924C31.8166 29.8025 32 29.6191 32 29.3949V3.40764C32 3.18344 31.8166 3 31.5924 3ZM25.3901 25.0698L22.669 22.3468L23.9327 22.361V19.4443H26.8494V22.361L28.1111 22.3468L25.3901 25.0698ZM30.3694 8.68662V17.5773C30.3694 17.8036 30.186 17.985 29.9618 17.985H2.38471C2.20127 17.985 2.04025 17.8627 1.99134 17.6874C1.94242 17.5101 2.01783 17.3225 2.17682 17.2288L21.8395 5.50293C21.9027 5.46624 21.976 5.44586 22.0494 5.44586H29.9618C30.186 5.44586 30.3694 5.6293 30.3694 5.8535V8.68662Z" fill="white"/>
                            <path d="M22.0249 8.66625L7.71869 17.1962H29.5541V8.60918H22.2328C22.1595 8.60918 22.0861 8.62956 22.0249 8.66625ZM25.5123 10.2092L28.2333 12.9302L26.9717 12.9159V15.8326H24.055V12.9159L22.7913 12.9302L25.5123 10.2092Z" fill="white"/>
                        </svg>
                    </div>`;
                } else {
                    var windowsHTML = `
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivWindow-${i}" onclick="clFunc('window', '${i}')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivWindow-${i}"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style="position: relative;">
                            <path d="M0.407645 3H9.88535C9.95873 3 10.0321 3.02038 10.0932 3.05707L31.8003 15.9997C31.9246 16.0731 32 16.2076 32 16.3503V29.3949C32 29.6191 31.8166 29.8025 31.5924 29.8025H0.407645C0.183441 29.8025 1.71643e-06 29.6191 1.71643e-06 29.3949V3.40764C1.71643e-06 3.18344 0.183441 3 0.407645 3ZM6.60994 25.0698L9.33096 22.3468L8.06726 22.361V19.4443H5.15057V22.361L3.88892 22.3468L6.60994 25.0698ZM1.63057 8.68662V17.5773C1.63057 17.8036 1.81401 17.985 2.03822 17.985H29.6153C29.7987 17.985 29.9597 17.8627 30.0087 17.6874C30.0576 17.5101 29.9822 17.3225 29.8232 17.2288L10.1605 5.50293C10.0973 5.46624 10.024 5.44586 9.95057 5.44586H2.03822C1.81401 5.44586 1.63057 5.6293 1.63057 5.8535V8.68662Z" fill="white"/>
                            <path d="M9.97507 8.66625L24.2813 17.1962H2.4459V8.60918H9.76717C9.84055 8.60918 9.91392 8.62956 9.97507 8.66625ZM6.48768 10.2092L3.76666 12.9302L5.02832 12.9159V15.8326H7.945V12.9159L9.2087 12.9302L6.48768 10.2092Z" fill="white"/>
                        </svg>
                    </div>`;
                }
                appendHtml(document.getElementById("MDDBottomDivWindows"), windowsHTML);
            };
            // Seats
            document.getElementById("MDDBottomDivSeats").innerHTML="";
            for (i = -1; i < ed.carData.doorNum - 1; i++) {
                if (i === -1) {
                    var seatsHTML = `
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivSeat-${i}"onclick="clFunc('changeSeat', '-1')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivSeat-${i}" ></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style="position: relative;">
                            <g clip-path="url(#clip0_33_7)">
                                <path d="M16 13.8632C14.9519 13.8632 14.1025 14.7125 14.1025 15.7605C14.1025 16.8082 14.9519 17.6576 16 17.6576C17.0478 17.6576 17.8971 16.8082 17.8971 15.7605C17.897 14.7125 17.0478 13.8632 16 13.8632ZM3.80141 20.5865C5.25652 24.4443 8.48958 27.4361 12.4977 28.5556C13.1978 28.7511 13.4078 28.1671 13.1315 26.9176C12.6752 24.8542 11.9216 22.4227 10.7822 21.4313C9.56618 20.3734 6.86367 19.5773 4.74115 19.0863C3.40772 18.783 3.61223 20.0819 3.80141 20.5865ZM0 16.0001C0 7.17763 7.17756 0 16 0C24.8224 0 32 7.17763 32 16.0001C32 24.8225 24.8224 32 16 32C7.17756 32 0 24.8224 0 16.0001ZM26.1215 13.6515C27.853 14.0952 28.7742 13.2111 28.2979 11.6789C26.5112 6.60831 21.6738 2.96403 16 2.96403C10.3262 2.96403 5.48875 6.60831 3.70212 11.6788C3.2258 13.2111 4.14701 14.0952 5.87851 13.6514C8.77872 12.9025 12.2584 12.0298 16 12.0298C19.7416 12.0298 23.2213 12.9025 26.1215 13.6515ZM27.2588 19.0863C25.1363 19.5774 22.4338 20.3734 21.2178 21.4313C20.0784 22.4227 19.3248 24.8542 18.8685 26.9176C18.5922 28.1671 18.8022 28.7511 19.5023 28.5556C23.5105 27.4361 26.7436 24.4443 28.1986 20.5865C28.3878 20.0819 28.5922 18.783 27.2588 19.0863ZM5.45184 15.9279C5.07208 15.9279 4.76397 16.236 4.76397 16.6159C4.76397 16.9955 5.07208 17.3037 5.45184 17.3037C5.83176 17.3037 6.13986 16.9955 6.13986 16.6159C6.13986 16.236 5.83176 15.9279 5.45184 15.9279ZM8.89142 15.9279C8.51151 15.9279 8.2034 16.236 8.2034 16.6159C8.2034 16.9955 8.51151 17.3037 8.89142 17.3037C9.27104 17.3037 9.57915 16.9955 9.57915 16.6159C9.57915 16.236 9.27104 15.9279 8.89142 15.9279ZM23.108 15.9279C22.7282 15.9279 22.4201 16.236 22.4201 16.6159C22.4201 16.9955 22.7282 17.3037 23.108 17.3037C23.4877 17.3037 23.7959 16.9955 23.7959 16.6159C23.7959 16.236 23.4877 15.9279 23.108 15.9279ZM26.5476 15.9279C26.1677 15.9279 25.8595 16.236 25.8595 16.6159C25.8595 16.9955 26.1677 17.3037 26.5476 17.3037C26.9272 17.3037 27.2353 16.9955 27.2353 16.6159C27.2353 16.236 26.9272 15.9279 26.5476 15.9279Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_33_7">
                                    <rect width="32" height="32" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>`;
                } else {
                    var seatsHTML = `
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivSeat-${i}" onclick="clFunc('changeSeat', '${i}')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivSeat-${i}"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" style="position: relative;">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 25.1613C2 24.0187 3.18133 23.556 4.42133 24.5307C4.98 25.844 5.56 27.14 7.384 27.4467C10.616 27.4467 11.6933 26 16 26C20.3067 26 21.384 27.4467 24.616 27.4467C26.44 27.14 27.02 25.844 27.5787 24.5307C28.8187 23.556 30 24.0187 30 25.1613C30 29.732 27.8453 32 25.6933 32H6.30667C4.15467 32 2 29.732 2 25.1613Z" fill="white"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 23C6 16 6.796 10.952 8.85733 7C9.188 6.148 9.80933 5 11.7147 5H13V4H11.816C11.216 4.004 10.9013 3.704 11.028 3C11.292 1.248 11.9533 0 12.9587 0H19.0413C20.0467 0 20.708 1.248 20.972 3C21.0987 3.704 20.784 4.004 20.184 4H19V5H20.2853C22.1907 5 22.812 6.148 23.1427 7C25.204 10.952 26 16 26 23C26 25 24.0947 26 23.1427 26C22.9307 25.936 22.72 25.8747 22.5093 25.816C22.8093 25.3573 23.012 24.772 23.012 24.0707C23.012 19.096 22.6147 15.2827 21.5893 12.2013L21.1267 10.968C20.9067 10.2587 20.3893 8.99733 18.792 8.99733H13.212C11.6213 8.99733 11.1 10.2467 10.8747 10.968L10.412 12.2013C9.388 15.2827 8.992 19.096 8.992 24.0707C8.992 24.7667 9.18933 25.348 9.48667 25.8053C9.27333 25.868 9.064 25.9333 8.85733 26C7.90533 26 6 25 6 23ZM21.4533 25.5467C17.536 24.6373 13.7653 24.756 10.5307 25.528C10.2387 25.216 9.992 24.74 9.992 24.0707C9.992 18.4227 10.5107 14.4173 11.8147 11.3013C12.0387 10.596 12.3293 9.99733 13.212 9.99733H18.792C19.68 9.99733 19.968 10.608 20.1773 11.2747C21.492 14.4173 22.012 18.4227 22.012 24.0707C22.012 24.7533 21.7533 25.2347 21.4533 25.5467ZM18.0013 5V4H13.9987V5H18.0013Z" fill="white"/>
                        </svg>
                    </div>`;
                }
                appendHtml(document.getElementById("MDDBottomDivSeats"), seatsHTML);
            };
            vehData.mySeat = ed.carData.playerSeat;
            document.getElementById("MDDBDDivSeat-" + ed.carData.playerSeat).classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivSeat-" + ed.carData.playerSeat).classList.remove("MDDBDDivDeactive");
            document.getElementById("MDDBDDivSeat-" + ed.carData.playerSeat).classList.add("MDDBDDivActive");
            topLeft("change", "MDDBDDTopLeftDivSeat-" + ed.carData.playerSeat);
            // Doors
            vehData.doorData["trunk"] = ed.carData.trunk;
            vehData.doorData["hood"] = ed.carData.hood;
            document.getElementById("MDDBottomDivDoors").innerHTML="";
            ed.carData.doorData.forEach(function(doorData, index) {
                vehData.doorData[doorData.doorNum] = doorData.opened;
                if (Number(doorData.doorNum) === 0) {
                    var doorsHTML = `
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivDoor-${doorData.doorNum}" style="width: 16%;" onclick="clFunc('door', '${doorData.doorNum}')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivDoor-${doorData.doorNum}"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M2.68801 30.144H29.376C30.528 30.144 31.424 29.248 31.424 28.096V3.328C31.424 2.496 30.784 1.856 29.952 1.856H16.512C13.568 1.856 10.816 3.2 8.96001 5.504C0.640015 15.936 0.896015 15.488 0.832015 15.744C0.704015 15.936 0.640015 16.192 0.640015 16.384V28.096C0.640015 29.248 1.53601 30.144 2.68801 30.144ZM26.752 19.328H23.488C23.104 19.328 22.784 19.008 22.784 18.624C22.784 18.24 23.104 17.92 23.488 17.92H26.752C27.136 17.92 27.456 18.24 27.456 18.624C27.456 19.008 27.136 19.328 26.752 19.328ZM11.264 7.36C12.544 5.76 14.464 4.864 16.512 4.864H28.416V14.976H5.24801L11.264 7.36Z" fill="white"/>
                            <path d="M20.096 14.08H22.144L27.2 5.696H25.152L20.096 14.08Z" fill="white"/>
                            <path d="M22.912 5.696L17.792 14.08H19.136L24.256 5.696H22.912Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivDoor-trunk" style="width: 16%;" onclick="clFunc('door', 'trunk')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivDoor-trunk"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M30.4617 18.8317C30.41 18.7533 30.3867 18.7767 30.37 18.685C30.27 18.155 30.7183 16.5717 30.0667 16.2083C29.2167 15.735 25.795 15.6967 25.795 15.6967L25.79 15.695C27.0883 14.8867 28.5717 14.1367 29.3983 14.2617C29.4917 14.3083 29.725 14.6117 29.8883 14.8967L30.4667 14.5667C30.2367 14.1617 29.8867 13.6667 29.53 13.6117C28.3467 13.4283 26.4667 14.4467 25.07 15.355C24.1067 14.905 22.4467 14.1433 21.7483 13.92C20.7233 13.5917 15.195 13.0783 13.43 13.5433C12.1 13.8933 10.0883 15.3183 8.58999 16.1517C8.01999 16.47 1.06666 15.7067 0.841656 18.9833C0.749989 19.0517 0.711656 19.2717 0.756656 19.5333C0.794989 19.7433 0.876656 19.9133 0.96499 19.9883C1.01999 20.1883 1.08666 20.3933 1.17999 20.6133C1.35332 21.02 2.53999 21.0733 3.16499 21.0733C3.33499 22.2833 4.36499 23.22 5.62332 23.22C6.67666 23.22 7.57332 22.5633 7.93832 21.6367L8.21332 21.6733H21.715C22.0883 22.58 22.9783 23.22 24.02 23.22C25.06 23.22 25.95 22.58 26.3233 21.6733H26.7033C26.7033 21.6733 29.765 21.2367 30.1817 20.9917C30.49 20.8117 30.1217 20.025 30.4633 19.665C30.605 19.5133 30.575 19.0067 30.4617 18.8317ZM5.62332 22.5517C4.61666 22.5517 3.79666 21.7333 3.79666 20.7267C3.79666 19.72 4.61666 18.9017 5.62332 18.9017C6.62832 18.9017 7.44832 19.72 7.44832 20.7267C7.44832 21.7333 6.62832 22.5517 5.62332 22.5517ZM16.565 16.015L10.84 16C10.84 16 12.5233 14.6967 13.2033 14.4683C14.0183 14.195 16.565 14.2717 16.565 14.2717V16.015ZM16.81 16V14.2717C16.81 14.2717 18.5583 14.2367 19.03 14.3717C19.8133 14.5967 21.5417 16 21.5417 16H16.81ZM24.0183 22.5517C23.0117 22.5517 22.1933 21.7333 22.1933 20.7267C22.1933 19.72 23.0133 18.9017 24.0183 18.9017C25.025 18.9017 25.8433 19.72 25.8433 20.7267C25.8433 21.7333 25.025 22.5517 24.0183 22.5517Z" fill="white"/>
                        </svg>
                    </div>`;
                } else if (isOdd(Number(doorData.doorNum)) === true) {
                    var doorsHTML = `
                    <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivDoor-${doorData.doorNum}" style="width: 16%;" onclick="clFunc('door', '${doorData.doorNum}')">
                        <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivDoor-${doorData.doorNum}"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M29.312 30.144H2.62399C1.47199 30.144 0.575987 29.248 0.575987 28.096V3.328C0.575987 2.496 1.21599 1.856 2.04799 1.856H15.488C18.432 1.856 21.184 3.2 23.04 5.504C31.36 15.936 31.104 15.488 31.168 15.744C31.296 15.936 31.36 16.192 31.36 16.384V28.096C31.36 29.248 30.464 30.144 29.312 30.144ZM5.24799 19.328H8.51199C8.89599 19.328 9.21599 19.008 9.21599 18.624C9.21599 18.24 8.89599 17.92 8.51199 17.92H5.24799C4.86399 17.92 4.54398 18.24 4.54398 18.624C4.54398 19.008 4.86399 19.328 5.24799 19.328ZM20.736 7.36C19.456 5.76 17.536 4.864 15.488 4.864H3.58398V14.976H26.752L20.736 7.36Z" fill="white"/>
                            <path d="M11.904 14.08H9.85599L4.79999 5.696H6.84799L11.904 14.08Z" fill="white"/>
                            <path d="M9.08798 5.696L14.208 14.08H12.864L7.74398 5.696H9.08798Z" fill="white"/>
                        </svg>
                    </div>`;
                } else {
                    if (ed.carData.doorNum === 4) {
                        var doorsHTML = `
                        <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivDoor-${doorData.doorNum}" style="width: 16%;" onclick="clFunc('door', '${doorData.doorNum}')">
                            <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivDoor-${doorData.doorNum}"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M2.68801 30.144H29.376C30.528 30.144 31.424 29.248 31.424 28.096V3.328C31.424 2.496 30.784 1.856 29.952 1.856H16.512C13.568 1.856 10.816 3.2 8.96001 5.504C0.640015 15.936 0.896015 15.488 0.832015 15.744C0.704015 15.936 0.640015 16.192 0.640015 16.384V28.096C0.640015 29.248 1.53601 30.144 2.68801 30.144ZM26.752 19.328H23.488C23.104 19.328 22.784 19.008 22.784 18.624C22.784 18.24 23.104 17.92 23.488 17.92H26.752C27.136 17.92 27.456 18.24 27.456 18.624C27.456 19.008 27.136 19.328 26.752 19.328ZM11.264 7.36C12.544 5.76 14.464 4.864 16.512 4.864H28.416V14.976H5.24801L11.264 7.36Z" fill="white"/>
                                <path d="M20.096 14.08H22.144L27.2 5.696H25.152L20.096 14.08Z" fill="white"/>
                                <path d="M22.912 5.696L17.792 14.08H19.136L24.256 5.696H22.912Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="MDDBDDiv MDDBDDivDefault" id="MDDBDDivDoor-hood" style="width: 16%;" onclick="clFunc('door', 'hood')">
                            <div class="MDDBDDTopLeftDiv MDDBDDTopLeftDivRed" id="MDDBDDTopLeftDivDoor-hood"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M30.4617 18.8317C30.41 18.7533 30.3867 18.7767 30.37 18.685C30.27 18.155 30.7184 16.5717 30.0667 16.2083C29.2167 15.735 25.795 15.6967 25.795 15.6967C25.795 15.6967 22.7617 14.2433 21.7484 13.92C20.7234 13.5917 15.195 13.0767 13.43 13.5417C12.24 13.855 10.505 15.0283 9.08003 15.8683C8.15669 15.1633 4.81169 12.7283 3.03169 13.0083C2.67669 13.0633 2.32669 13.5583 2.09502 13.965L2.67502 14.295C2.83836 14.0083 3.07169 13.705 3.13336 13.6667C4.38169 13.4733 7.03836 15.1933 8.40836 16.2C7.16836 16.3883 1.05169 15.9133 0.840025 18.9817C0.750025 19.05 0.710025 19.2717 0.756692 19.5317C0.793358 19.7433 0.876692 19.9117 0.963358 19.9883C1.01836 20.1867 1.08502 20.3917 1.17836 20.6133C1.35169 21.0183 2.53336 21.0733 3.16169 21.0733C3.32002 22.2967 4.35502 23.2467 5.62169 23.2467C6.68503 23.2467 7.58669 22.5767 7.94503 21.6367L8.21169 21.6717H21.7067C22.0734 22.5933 22.9684 23.2467 24.02 23.2467C25.07 23.2467 25.9667 22.5933 26.3317 21.6717H26.7034C26.7034 21.6717 29.765 21.235 30.1817 20.9917C30.4917 20.81 30.1217 20.0233 30.4634 19.665C30.605 19.5133 30.575 19.0067 30.4617 18.8317ZM5.62336 22.58C4.61669 22.58 3.79669 21.76 3.79669 20.7533C3.79669 19.7483 4.61669 18.93 5.62336 18.93C6.62836 18.93 7.44836 19.7483 7.44836 20.7533C7.44836 21.76 6.62836 22.58 5.62336 22.58ZM16.565 16.015L10.84 16C10.84 16 12.5234 14.6967 13.2034 14.4683C14.0184 14.195 16.565 14.2717 16.565 14.2717V16.015ZM16.81 16V14.2717C16.81 14.2717 18.5584 14.2367 19.03 14.3717C19.8134 14.5967 21.5417 16 21.5417 16H16.81ZM24.0184 22.58C23.0117 22.58 22.1934 21.76 22.1934 20.7533C22.1934 19.7483 23.0134 18.93 24.0184 18.93C25.025 18.93 25.8434 19.7483 25.8434 20.7533C25.8434 21.76 25.025 22.58 24.0184 22.58Z" fill="white"/>
                            </svg>
                        </div>`;
                    }
                }
                appendHtml(document.getElementById("MDDBottomDivDoors"), doorsHTML);
            });
            vehData.vehConvertible = ed.carData.vehConvertible;
            if (ed.carData.vehConvertible === false) {
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDefault");
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivActive");
                document.getElementById("MDDBDDivCarConvert").classList.add("MDDBDDivDeactive");
                topLeft("default", "MDDBDDTopLeftDivCarConvert");
            } else {
                document.getElementById("MDDBDDivCarConvert").classList.add("MDDBDDivDefault");
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDeactive");
                // document.getElementById("MDDBDDivCarConvert").classList.add("MDDBDDivActive");
                topLeft("default", "MDDBDDTopLeftDivCarConvert");
            }
            if (ed.carData.vehConvertibleState === 2 || ed.carData.vehConvertibleState === 3) {
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDefault");
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDeactive");
                document.getElementById("MDDBDDivCarConvert").classList.add("MDDBDDivActive");
                vehData.vehConvertibleState = true;
                topLeft("change", "MDDBDDTopLeftDivCarConvert");
            }
		} else {
			carMenuOpen = false;
            document.getElementById("mainDiv").style.display = "none";
		}
        if (ed.carData.engineState === 1) {
            vehData.engineState = true;
            document.getElementById("MDDBDDEngineOn").style.display = "block";
            document.getElementById("MDDBDDEngineOff").style.display = "none";
            topLeft('change', 'MDDBDDTopLeftDivEngine');
        } else {
            vehData.engineState = false;
            document.getElementById("MDDBDDEngineOn").style.display = "none";
            document.getElementById("MDDBDDEngineOff").style.display = "block";
            topLeft('default', 'MDDBDDTopLeftDivEngine');
        }
        if (ed.carData.intLightState === 1) {
            vehData.intLightState = true;
            topLeft('change', 'MDDBDDTopLeftDivIntLight');
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIntLight").classList.add("MDDBDDivActive");
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivDeactive");
            document.getElementById("MDDBDDivIntLightSVG1").style.display = "block";
            document.getElementById("MDDBDDivIntLightSVG2").style.display = "block";
            document.getElementById("MDDBDDivIntLightSVG3").style.display = "block";
        } else {
            vehData.intLightState = false;
            topLeft('default', 'MDDBDDTopLeftDivIntLight');
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivActive");
            document.getElementById("MDDBDDivIntLight").classList.add("MDDBDDivDeactive");
            document.getElementById("MDDBDDivIntLightSVG1").style.display = "none";
            document.getElementById("MDDBDDivIntLightSVG2").style.display = "none";
            document.getElementById("MDDBDDivIntLightSVG3").style.display = "none";
        }
        if (ed.carData.highbeamsOn) {
            document.getElementById("MDDBDDivIntLightSVGMain").innerHTML=`
            <g clip-path="url(#clip0_94_25)">
                <path d="M31.3334 16C31.3334 21.9333 26.4667 24.5333 19.2667 26.3333C18.4667 26.5333 17.6 26.2667 17.1334 25.5333C15.7334 23.4 14.6667 19.5333 14.6667 16C14.6667 12.4667 15.7334 8.6 17.1334 6.46666C17.6 5.73333 18.4667 5.46666 19.2667 5.66666C26.4667 7.46666 31.3334 10.0667 31.3334 16Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 10.328L0.205094 10.3387" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 13.6613L0.205094 13.672" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 16.9946L0.205094 17.0054" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 20.328L0.205094 20.3387" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 23.6613L0.205094 23.672" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_94_25">
                    <rect width="32" height="32" fill="green"/>
                </clipPath>
            </defs>`;
            topLeft('change', 'MDDBDDTopLeftDivLights');
            vehData.lightsData.highbeamsOn = true;
            vehData.lightsData.lightsOn = false;
        } else if (ed.carData.lightsOn) {
            document.getElementById("MDDBDDivIntLightSVGMain").innerHTML=`
            <g clip-path="url(#clip0_79_5)">
                <path d="M31.3334 16C31.3334 21.9333 26.4667 24.5333 19.2667 26.3333C18.4667 26.5333 17.6 26.2667 17.1334 25.5333C15.7334 23.4 14.6667 19.5333 14.6667 16C14.6667 12.4667 15.7334 8.6 17.1334 6.46666C17.6 5.73333 18.4667 5.46666 19.2667 5.66666C26.4667 7.46666 31.3334 10.0667 31.3334 16Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 8L0.666687 12.6667" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 11.3333L0.666687 16" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 14.6667L0.666687 19.3333" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 18L0.666687 22.6667" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 21.3333L0.666687 26" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_79_5">
                    <rect width="32" height="32" fill="blue"/>
                </clipPath>
            </defs>`;
            topLeft('change', 'MDDBDDTopLeftDivLights');
            vehData.lightsData.lightsOn = true;
            vehData.lightsData.highbeamsOn = false;
        } else {
            document.getElementById("MDDBDDivIntLightSVGMain").innerHTML=`
            <g clip-path="url(#clip0_79_5)">
                <path d="M31.3334 16C31.3334 21.9333 26.4667 24.5333 19.2667 26.3333C18.4667 26.5333 17.6 26.2667 17.1334 25.5333C15.7334 23.4 14.6667 19.5333 14.6667 16C14.6667 12.4667 15.7334 8.6 17.1334 6.46666C17.6 5.73333 18.4667 5.46666 19.2667 5.66666C26.4667 7.46666 31.3334 10.0667 31.3334 16Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 8L0.666687 12.6667" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 11.3333L0.666687 16" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 14.6667L0.666687 19.3333" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 18L0.666687 22.6667" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 21.3333L0.666687 26" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_79_5">
                    <rect width="32" height="32" fill="white"/>
                </clipPath>
            </defs>`;
            topLeft('default', 'MDDBDDTopLeftDivLights');
            vehData.lightsData.lightsOn = false;
        }
        if (ed.carData.indicatorState === 1) {
            vehData.leftIndicator = true;
            document.getElementById("MDDBDDivIndicatorLeft").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorLeft").classList.add("MDDBDDivAlarm");
            document.getElementById("MDDBDDivIndicatorRight").classList.add("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorRight").classList.remove("MDDBDDivAlarm");
        } else if (ed.carData.indicatorState === 2) {
            vehData.rightIndicator = true;
            document.getElementById("MDDBDDivIndicatorLeft").classList.remove("MDDBDDivAlarm");
            document.getElementById("MDDBDDivIndicatorLeft").classList.add("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorRight").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorRight").classList.add("MDDBDDivAlarm");
        } else if (ed.carData.indicatorState === 3) {
            vehData.leftIndicator = true;
            vehData.rightIndicator = true;
            // Left
            document.getElementById("MDDBDDivIndicatorLeft").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorLeft").classList.add("MDDBDDivAlarm");
            // Right
            document.getElementById("MDDBDDivIndicatorRight").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorRight").classList.add("MDDBDDivAlarm");
        } else {
            vehData.leftIndicator = false;
            vehData.rightIndicator = false;
            document.getElementById("MDDBDDivIndicatorLeft").classList.add("MDDBDDivDefault");
            document.getElementById("MDDBDDivIndicatorLeft").classList.remove("MDDBDDivAlarm");
            document.getElementById("MDDBDDivIndicatorRight").classList.remove("MDDBDDivAlarm");
            document.getElementById("MDDBDDivIndicatorRight").classList.add("MDDBDDivDefault");
        }
    } else if (ed.action === "closeAlarm") {
        vehData.alarmState = false;
        document.getElementById("MDDBDDivAlarm").classList.add("MDDBDDivDefault");
        document.getElementById("MDDBDDivAlarm").classList.remove("MDDBDDivAlarm");
        topLeft("default", "MDDBDDTopLeftDivAlarm");
    }
    document.onkeyup = function(data) {
		if (data.which == 27 && carMenuOpen) {
            carMenuOpen = false;
            document.getElementById("mainDiv").style.display = "none";
			var xhr = new XMLHttpRequest();
			xhr.open("POST", `https://${resourceName}/callback`, true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify({action: "nuiFocus"}));
		}
	}
})

function clFunc(name1, name2) {
    if (name1 === "door") {
        if (vehData.doorData[name2] === true) {
            vehData.doorData[name2] = false;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "door", number: name2, state: false}));
            document.getElementById("MDDBDDivDoor-" + name2).classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivDoor-" + name2).classList.add("MDDBDDivDeactive");
            document.getElementById("MDDBDDivDoor-" + name2).classList.remove("MDDBDDivActive");
            topLeft('default', 'MDDBDDTopLeftDivDoor-' + name2);
        } else {
            vehData.doorData[name2] = true;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "door", number: name2, state: true}));
            document.getElementById("MDDBDDivDoor-" + name2).classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivDoor-" + name2).classList.remove("MDDBDDivDeactive");
            document.getElementById("MDDBDDivDoor-" + name2).classList.add("MDDBDDivActive");
            topLeft('change', 'MDDBDDTopLeftDivDoor-' + name2);
        }
    } else if (name1 === "convertVeh") {
        if (vehData.vehConvertible === 1) {
            if (vehData.vehConvertibleState === true) {
                vehData.vehConvertibleState = false;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", `https://${resourceName}/callback`, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({action: "convertVeh", state: false}));
                document.getElementById("MDDBDDivCarConvert").classList.add("MDDBDDivDefault");
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivActive");
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDeactive");
                topLeft("default", "MDDBDDTopLeftDivCarConvert");
            } else {
                vehData.vehConvertibleState = true;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", `https://${resourceName}/callback`, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({action: "convertVeh", state: true}));
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDefault");
                document.getElementById("MDDBDDivCarConvert").classList.remove("MDDBDDivDeactive");
                document.getElementById("MDDBDDivCarConvert").classList.add("MDDBDDivActive");
                topLeft("change", "MDDBDDTopLeftDivCarConvert");
            }
        }
    } else if (name1 === "window") {
        if (vehData.windows[Number(name2)] === false) {
            vehData.windows[Number(name2)] = true;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "window", num: Number(name2), state: true}));
            document.getElementById("MDDBDDivWindow-" + name2).classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivWindow-" + name2).classList.add("MDDBDDivDeactive");
            document.getElementById("MDDBDDivWindow-" + name2).classList.remove("MDDBDDivActive");
            topLeft("change", "MDDBDDTopLeftDivWindow-" + name2);
        } else {
            vehData.windows[Number(name2)] = false;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "window", num: Number(name2), state: false}));
            document.getElementById("MDDBDDivWindow-" + name2).classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivWindow-" + name2).classList.remove("MDDBDDivDeactive");
            document.getElementById("MDDBDDivWindow-" + name2).classList.add("MDDBDDivActive");
            topLeft("default", "MDDBDDTopLeftDivWindow-" + name2);
        }
    } else if (name1 === "changeSeat") {
        if (vehData.mySeat) {
            document.getElementById("MDDBDDivSeat-" + vehData.mySeat).classList.add("MDDBDDivDefault");
            document.getElementById("MDDBDDivSeat-" + vehData.mySeat).classList.remove("MDDBDDivDeactive");
            document.getElementById("MDDBDDivSeat-" + vehData.mySeat).classList.remove("MDDBDDivActive");
            topLeft("default", "MDDBDDTopLeftDivSeat-" + vehData.mySeat);
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", `https://${resourceName}/callback`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({action: "changeSeat", num: name2}));
        vehData.mySeat = name2;
        document.getElementById("MDDBDDivSeat-" + vehData.mySeat).classList.remove("MDDBDDivDefault");
        document.getElementById("MDDBDDivSeat-" + vehData.mySeat).classList.remove("MDDBDDivDeactive");
        document.getElementById("MDDBDDivSeat-" + vehData.mySeat).classList.add("MDDBDDivActive");
        topLeft("change", "MDDBDDTopLeftDivSeat-" + vehData.mySeat);
    } else if (name1 === "engine") {
        console.log(vehData.mySeat)
        if (Number(vehData.mySeat) === -1) {
            if (vehData.engineState === false) {
                vehData.engineState = true;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", `https://${resourceName}/callback`, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({action: "engine", state: true}));
                document.getElementById("MDDBDDEngineOn").style.display = "block";
                document.getElementById("MDDBDDEngineOff").style.display = "none";
                topLeft('change', 'MDDBDDTopLeftDivEngine');
            } else {
                vehData.engineState = false;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", `https://${resourceName}/callback`, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({action: "engine", state: false}));
                document.getElementById("MDDBDDEngineOn").style.display = "none";
                document.getElementById("MDDBDDEngineOff").style.display = "block";
                topLeft('default', 'MDDBDDTopLeftDivEngine');
            }
        }
    } else if (name1 === "alarm") {
        if (vehData.alarmState === false) {
            vehData.alarmState = true;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "alarm", state: true}));
            // document.getElementById("MDDBDDivAlarm").style.animation = "blink 1.5s linear infinite";
            document.getElementById("MDDBDDivAlarm").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivAlarm").classList.add("MDDBDDivAlarm");
            topLeft("change", "MDDBDDTopLeftDivAlarm");
        } else {
            vehData.alarmState = false;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "alarm", state: false}));
            document.getElementById("MDDBDDivAlarm").classList.add("MDDBDDivDefault");
            document.getElementById("MDDBDDivAlarm").classList.remove("MDDBDDivAlarm");
            topLeft("default", "MDDBDDTopLeftDivAlarm");
        }
    } else if (name1 === "intLight") {
        if (vehData.intLightState === false) {
            vehData.intLightState = true;
            topLeft('change', 'MDDBDDTopLeftDivIntLight');
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIntLight").classList.add("MDDBDDivActive");
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivDeactive");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "intLight", state: true}));
            document.getElementById("MDDBDDivIntLightSVG1").style.display = "block";
            document.getElementById("MDDBDDivIntLightSVG2").style.display = "block";
            document.getElementById("MDDBDDivIntLightSVG3").style.display = "block";
        } else {
            vehData.intLightState = false;
            topLeft('default', 'MDDBDDTopLeftDivIntLight');
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivDefault");
            document.getElementById("MDDBDDivIntLight").classList.remove("MDDBDDivActive");
            document.getElementById("MDDBDDivIntLight").classList.add("MDDBDDivDeactive");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "intLight", state: false}));
            document.getElementById("MDDBDDivIntLightSVG1").style.display = "none";
            document.getElementById("MDDBDDivIntLightSVG2").style.display = "none";
            document.getElementById("MDDBDDivIntLightSVG3").style.display = "none";
        }
    } else if (name1 === "lights") {
        if (vehData.lightsData.lightsOn === false) {
            vehData.lightsData.lightsOn = true;
            vehData.lightsData.highbeamsOn = false;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "lights", name: "normal", state: true}));
            document.getElementById("MDDBDDivIntLightSVGMain").innerHTML=`
            <g clip-path="url(#clip0_79_5)">
                <path d="M31.3334 16C31.3334 21.9333 26.4667 24.5333 19.2667 26.3333C18.4667 26.5333 17.6 26.2667 17.1334 25.5333C15.7334 23.4 14.6667 19.5333 14.6667 16C14.6667 12.4667 15.7334 8.6 17.1334 6.46666C17.6 5.73333 18.4667 5.46666 19.2667 5.66666C26.4667 7.46666 31.3334 10.0667 31.3334 16Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 8L0.666687 12.6667" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 11.3333L0.666687 16" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 14.6667L0.666687 19.3333" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 18L0.666687 22.6667" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12 21.3333L0.666687 26" stroke="dodgerblue" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_79_5">
                    <rect width="32" height="32" fill="blue"/>
                </clipPath>
            </defs>`;
            topLeft('change', 'MDDBDDTopLeftDivLights');
        } else if (vehData.lightsData.lightsOn === true) {
            vehData.lightsData.lightsOn = false;
            vehData.lightsData.highbeamsOn = true;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "lights", name: "highbeams", state: true}));
            document.getElementById("MDDBDDivIntLightSVGMain").innerHTML=`
            <g clip-path="url(#clip0_94_25)">
                <path d="M31.3334 16C31.3334 21.9333 26.4667 24.5333 19.2667 26.3333C18.4667 26.5333 17.6 26.2667 17.1334 25.5333C15.7334 23.4 14.6667 19.5333 14.6667 16C14.6667 12.4667 15.7334 8.6 17.1334 6.46666C17.6 5.73333 18.4667 5.46666 19.2667 5.66666C26.4667 7.46666 31.3334 10.0667 31.3334 16Z" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 10.328L0.205094 10.3387" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 13.6613L0.205094 13.672" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 16.9946L0.205094 17.0054" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 20.328L0.205094 20.3387" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
                <path d="M12.4616 23.6613L0.205094 23.672" stroke="green" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_94_25">
                    <rect width="32" height="32" fill="green"/>
                </clipPath>
            </defs>`;
            topLeft('change', 'MDDBDDTopLeftDivLights');
        }
    } else if (name1 === "indicator") {
        if (Number(name2) === 1) {
            if (vehData.leftIndicator === true) {
                vehData.leftIndicator = false;
                document.getElementById("MDDBDDivIndicatorLeft").classList.add("MDDBDDivDefault");
                document.getElementById("MDDBDDivIndicatorLeft").classList.remove("MDDBDDivAlarm");
            } else {
                vehData.leftIndicator = true;
                document.getElementById("MDDBDDivIndicatorLeft").classList.remove("MDDBDDivDefault");
                document.getElementById("MDDBDDivIndicatorLeft").classList.add("MDDBDDivAlarm");
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "indicator", name: Number(name2), state: vehData.leftIndicator}));
        } else {
            if (vehData.rightIndicator === true) {
                vehData.rightIndicator = false;
                document.getElementById("MDDBDDivIndicatorRight").classList.add("MDDBDDivDefault");
                document.getElementById("MDDBDDivIndicatorRight").classList.remove("MDDBDDivAlarm");
            } else {
                vehData.rightIndicator = true;
                document.getElementById("MDDBDDivIndicatorRight").classList.remove("MDDBDDivDefault");
                document.getElementById("MDDBDDivIndicatorRight").classList.add("MDDBDDivAlarm");
            }
            var xhr = new XMLHttpRequest();
            xhr.open("POST", `https://${resourceName}/callback`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({action: "indicator", name: Number(name2), state: vehData.rightIndicator}));
        }
    }
}

function appendHtml(el, str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	while (div.children.length > 0) {
		el.appendChild(div.children[0]);
	}
}

function topLeft(action, div) {
    if (action === "change") {
        document.getElementById(div).classList.remove("MDDBDDTopLeftDivRed");
        document.getElementById(div).classList.add("MDDBDDTopLeftDivGreen");
    } else {
        document.getElementById(div).classList.add("MDDBDDTopLeftDivRed");
        document.getElementById(div).classList.remove("MDDBDDTopLeftDivGreen");
    }
}