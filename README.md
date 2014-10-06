# SAMP
Sistema de Auxílio à Mobilidade Pública


## Requirements
The following softwares need to be installed to run SAMP *(Use their own tutorials to install)*:

- Git
- Python3
- Pip
- Virtualenvwrapper (not required, but strongly recommended)
- Bower


## Installation

Run the next commands inside the project root folder.

- **Clone the repository**

  `$ git clone https://github.com/rougeth/samp`

- **Bower install**

  `$ npm install -g bower`

- **JS and CSS requirements**

  `$ bower install`

- **Python requirements**

  `$ pip install -r requirements.txt`


## Run

For the next instructions, be inside `/src` folder.

- **Create database**
 
  `$ python manage.py syncdb`
  
  `$ python manage.py makemigrations`
  
  `$ python manage.py migrate`

- **Load fixtures**

  `$ python manage.py loaddata ../fixtures_bus_stops.json`

- **Run dev server**

  `$ python manage.py runserver`
