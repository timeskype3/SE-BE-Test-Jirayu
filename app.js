const { exportCsv } = require('./utils/exportCSV');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Group_User = require('./models/group-user');

const { mongo: { URI } } = require('./config')

mongoose.connect(URI, { useNewUrlParser: true })

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err);
})

async function Question1() {
  try {
    const result = await Group_User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date('2021-11'),
            $lt: new Date('2021-12')
          }
        }
      }, {
        $lookup: {
          from: 'groups',
          localField: 'groupId',
          foreignField: '_id',
          as: 'group',
        },
      }, {
        $unwind: '$group'
      }, {
        $match: {
          'group.meta.isPrivate': true
        }
      }, {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      }, {
        $unwind: '$user'
      }, {
        $match: {
          'user.username': { $ne: null },
          'user.email': { $ne: null }
        }
      }, {
        $project: {
          '_id': 0,
          'Group Name': '$group.name',
          'Username': '$user.username',
          'Email': '$user.email'
        }
      }, {
        $sort: {
          'Group Name': 1,
          'Username': 1,
        }
      }
    ])
    return result;
  } catch (error) {
    console.log('Question 1 got error:', error);
  }
}

async function Question2() {
  try {
    const result = await User.updateMany({}, [
      {
        $set: {
          username: {
            $concat: [
              { $toUpper: { $substrCP: ['$username', 0, 1] } },
              { $substrCP: ['$username', 1, { $strLenCP: '$username' }] }
            ]
          }
        }
      }
    ])
    console.log('Capitalized all username', result);
  } catch (error) {
    console.log('Question 2 got error:', error);
  }
}


async function main() {
  const resQ1 = await Question1();
  // export CSV file
  if (resQ1?.length) {
    const headers = Object.keys(resQ1[0])
    const content = resQ1.map(row => Object.values(row))
    // add header
    content.unshift(headers)
    exportCsv(content);
  } else {
    console.log('No data found.')
  }
  await Question2();
  mongoose.connection.close()
}

main();

// Written by Jirayu Janraluek