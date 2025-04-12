import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Modal, TextInput, TouchableOpacity } from 'react-native';
import { getExpenses, deleteExpense } from '../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';

function ExpenseList({ onEdit }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const fetchExpenses = async (start = null, end = null) => {
    setLoading(true);
    try {
      const fetchedExpenses = await getExpenses(start, end);
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(startDate, endDate);
  }, [startDate, endDate]);

  const confirmDeleteExpense = (expense) => {
    setExpenseToDelete(expense);
    setModalVisible(true);
  };

  const performDeleteExpense = async () => {
    setModalVisible(false);
    if (expenseToDelete) {
      try {
        await deleteExpense(expenseToDelete._id);
        fetchExpenses(startDate, endDate);
      } catch (error) {
        console.error('Error deleting expense:', error);
      } finally {
        setExpenseToDelete(null);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>${item.amount.toFixed(2)} - {item.category}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
        {item.isRecurring && <Text style={styles.recurring}>Recurring</Text>}
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDeleteExpense(item)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate.toISOString());
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate.toISOString());
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (<View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowStartDatePicker(true)}>
          <Text>{startDate ? new Date(startDate).toLocaleDateString() : "Start Date"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowEndDatePicker(true)}>
          <Text>{endDate ? new Date(endDate).toLocaleDateString() : "End Date"}</Text>
        </TouchableOpacity>
      </View>
      {showStartDatePicker && (<DateTimePicker value={startDate ? new Date(startDate) : new Date()} mode="date" display="default" onChange={onStartDateChange}/>)}
      {showEndDatePicker && (<DateTimePicker value={endDate ? new Date(endDate) : new Date()} mode="date" display="default" minimumDate={startDate ? new Date(startDate) : new Date()} onChange={onEndDateChange}/>)}
      <FlatList data={expenses} renderItem={renderItem} keyExtractor={item => item._id}/>
       <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to delete this expense?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={performDeleteExpense} style={[styles.modalButton, styles.deleteButton]}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 14,
    color: 'green',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
  recurring: {
    fontSize: 12,
    color: 'blue',
    fontStyle: 'italic',
  },
  buttons: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  datePickerButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  modalButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
});

export default ExpenseList;
