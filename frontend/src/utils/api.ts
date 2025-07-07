import axios from 'axios'
import { addContact } from '../redux/slices/contacts'
import { Dispatch } from '@reduxjs/toolkit'

export const fetchContacts = async (dispatch: Dispatch) => {
	axios
		.get('http://localhost:5000/contacts/')
		.then(res => {
			if (res.data) {
				res.data.forEach((el: any) => dispatch(addContact(el)))
			} else {
				console.error('Incorrect data format:', res.data)
			}
		})
		.catch(error => {
			console.error('Fetch error:', error)
		})
}
