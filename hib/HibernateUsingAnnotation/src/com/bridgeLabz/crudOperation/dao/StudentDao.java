package com.bridgeLabz.crudOperation.dao;

import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.AnnotationConfiguration;
import org.hibernate.cfg.Configuration;
import org.hibernate.classic.Session;
import org.hibernate.hql.QueryExecutionRequestException;

import com.bridgeLabz.crudOperation.dto.Student;

public class StudentDao {
	private static SessionFactory sessionFactory;

	static {
		Configuration cfg = new AnnotationConfiguration();
		cfg.configure();
		sessionFactory = cfg.buildSessionFactory();
	}

	public static SessionFactory getFactory() {
		return sessionFactory;
	}

	public void save(Student student) {
		sessionFactory = getFactory();

		Session session = sessionFactory.openSession();
		Transaction tran = session.beginTransaction();
		try {
			session.save(student);
			tran.commit();
			System.out.println("save successfull...\n");
		} catch (HibernateException e) {
			e.printStackTrace();
			System.out.println("exception during save object ");
		} finally {
			session.close();
		}
	}

	public void update(int id, String name) {
		sessionFactory = getFactory();

		Session session = sessionFactory.openSession();
		Transaction tran = session.beginTransaction();
		try {
			Student s1 = (Student) session.get(Student.class, id);

			s1.setName(name);
			session.saveOrUpdate(s1);
			tran.commit();
			System.out.println("update successfull...\n");
		} catch (HibernateException e) {
			e.printStackTrace();
			System.out.println("exception in update ");
		} finally {
			session.close();
		}
	}

	public void delete(int id) {
		sessionFactory = getFactory();

		Session session = sessionFactory.openSession();
		Transaction tran = session.beginTransaction();
		try {
			Student s1 = (Student) session.get(Student.class, id);
			session.delete(s1);
			tran.commit();
			System.out.println("delete successfull...\n");
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception in delete ");
		} finally {
			session.close();
		}
	}

	public void displayAll() {
		sessionFactory = getFactory();

		Session session = sessionFactory.openSession();
		//Transaction tran = session.beginTransaction(); //bcoz transaction obj required for all operation except fetching
		try{
		Query qry = session.createQuery("from Student");
		List list = qry.list();
		for (Object o1 : list) {
			System.out.println(o1);
		}
		//tran.commit();
		System.out.println("displaying all record successfully...\n");
		}
		catch (HibernateException e) {
			e.printStackTrace();
			System.out.println("exception in displayAll ");
		}
		finally {
			session.close();
		}
	}

	public void displayParticular(int id) {
		sessionFactory = getFactory();

		Session session = sessionFactory.openSession();
		//Transaction tran = session.beginTransaction(); //bcoz transaction obj required for all operation except fetching
		try{
		Student s1 = (Student) session.get(Student.class, id);
		Query qry = session.createQuery("from Student where id=" + id);
		Student s = (Student) qry.uniqueResult();
		System.out.println(s);
		//tran.commit();
		System.out.println("displaying all record successfully...\n");
		}
		catch (HibernateException e) {
			e.printStackTrace();
			System.out.println("exception in displayParticular");
		}
		finally {
			session.close();
		}
	}
	
}
