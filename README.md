# Travel Buddy

## Project contributors
Group 2, Tutorial 8, CPSC 481
- Muhammad Adil (muhammad.adil3@ucalgary.ca)
- Ahmed Iqbal (ahmed.iqbal1@ucalgary.ca)
- Khushi Choksi (khushi.choksi@ucalgary.ca)
- Mark Canuel (mlcanuel@ucalgary.ca)
- Syed Haider (syed.haider4@ucalgary.ca)


## Information
* The design is created to run on an iPhone 14 Pro Max, which has the dimensions 430 x 932. Any other size will not accurately display our design.
* During our development, we primarily used Google Chrome for testing our application.
  * Due to this, please use Google Chrome to view our application.  
<br/><br/>
* Some example code is used for account and trip, located in TripContext and AccountContext.
  * If you do not wish to create an account, this information is hardcoded for example usage:
    * user: example@ucalgary.ca
    * password: password


<br/><br/>
## How to run this code locally
This is created using the Next.js framework (version 15.0.3 of Next.js & version 18.3.1 of React),. To be able to run it, you will need Node.js (v22.11.0) installed.

Here is the link to install Node if you do not have it: https://nodejs.org/en. You can verify that you have the version mentioned earlier installed by running `node -v` in the terminal. The command `npm -v` should also work. 

Once you have verified all of that, run the following commands in the terminal. 
1. `cd travel-app`              (navigate to the travel-app directory)
2. `npm install`
3. `npm run dev`                (after this, open http://localhost:3000/ on your browser)


<br/><br/>
## Instructions for using the app, on Google Chrome

1. First, run the code using the steps above, or use the deployed website link (https://travel-buddy-sandy.vercel.app).
2. (If you are running the code locally, open the link "http://localhost:3000/" on your browser. This is where it should appear.)
3. Once the page is loaded (should be a login screen), right-click and select "Inspect".
4. Click "Dimensions" on the top left and select "iPhone 14 Pro Max" for the size.


<br/><br/>
## How to navigate through the application design
(will be updated later)






<br/><br/>
## Libraries / installs
These are just the libraries that we have used in our application. Sometimes `npm run dev` will not work. If this problem occurs, please try installing these libraries first then running the code.
### react-icons are installed into this project.

<p>
 
`npm install react-icons --save`
 
to access the library of icons, refer to this link: https://react-icons.github.io/react-icons/
</p>

### other installs:

<p>

`npm install react-calendar`

`npm install react-time-picker`

`npm install react-big-calendar`

</p>

### full calendar installs

<p>
`npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid`

`npm install @fullcalendar/react@latest @fullcalendar/core@latest @fullcalendar/daygrid@latest @fullcalendar/timegrid@latest`

`npm install --save \
 @fullcalendar/core \
 @fullcalendar/bootstrap5`

`npm install --save bootstrap bootstrap-icons`

`npm install --save \
 @fullcalendar/core \
 @fullcalendar/bootstrap`

`npm install --save bootstrap@4 @fortawesome/fontawesome-free`

`npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/interaction`

</p>

### tailwind css documentation

<p>https://tailwindcss.com/docs/installation</p>
